terraform {
  cloud {
    organization = "TheSocialPitstop"

    workspaces {
      name = "prod"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Variables
variable "access_key" {
  description = "AWS IAM access key"
  type        = string
  sensitive   = true
}

variable "secret_key" {
  description = "AWS IAM secret key"
  type        = string
  sensitive   = true
}

# Configure the AWS Provider
provider "aws" {
  region     = "ap-southeast-1"
  access_key = var.access_key
  secret_key = var.secret_key
}

# S3
resource "aws_s3_bucket" "b" {
  bucket = "the-social-pitstop"

  tags = {
    Name        = "TheSocialPitstop"
    Environment = "production"
  }
}

resource "aws_s3_bucket_acl" "b_acl" {
  bucket = aws_s3_bucket.b.id
  acl    = "private"
}

# Cloudfront
locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.b.bucket_regional_domain_name
    origin_id   = local.s3_origin_id

    # s3_origin_config {
    #   origin_access_identity = "origin-access-identity/cloudfront/ABCDEFG1234567"
    # }
  }

  enabled         = true
  is_ipv6_enabled = true

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# DynamoDB
resource "aws_dynamodb_table" "db" {
  name           = "the-social-pitstop"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "user_id"
  range_key      = "item_type"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "item_type"
    type = "S"
  }

  attribute {
    name = "name"
    type = "S"
  }

  attribute {
    name = "category"
    type = "S"
  }

  # ttl {
  #   attribute_name = "TimeToExist"
  #   enabled        = false
  # }

  global_secondary_index {
    name               = "name_index"
    hash_key           = "item_type"
    range_key          = "name"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "category_index"
    hash_key           = "item_type"
    range_key          = "category"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "ALL"
  }

  tags = {
    Name        = "the-social-pitstop"
    Environment = "production"
  }
}

# AppSync
resource "aws_iam_role" "example" {
  name = "example"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "example" {
  name = "example"
  role = aws_iam_role.example.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_dynamodb_table.db.arn}",
        "${aws_dynamodb_table.db.arn}/index/*"
      ]
    }
  ]
}
EOF
}

resource "aws_appsync_graphql_api" "api" {
  authentication_type = "API_KEY"
  name                = "TSP API"
}

resource "aws_appsync_datasource" "datasource" {
  api_id           = aws_appsync_graphql_api.api.id
  name             = "TheSocialPitstop"
  service_role_arn = aws_iam_role.example.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.db.name
  }
}