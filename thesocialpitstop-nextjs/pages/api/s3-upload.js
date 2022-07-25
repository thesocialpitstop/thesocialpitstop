import { APIRoute } from "next-s3-upload";

export default APIRoute.configure({
    async key(req, filename) {
        let directory = req.body.directory;
        return `${directory}/${filename}`;
      }
    
});
