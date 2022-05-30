terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "ap-southeast-1"
}


# Create DynamoDB Table
resource "aws_dynamodb_table" "thesocialpitstop" {

}

#Create appsync resource
