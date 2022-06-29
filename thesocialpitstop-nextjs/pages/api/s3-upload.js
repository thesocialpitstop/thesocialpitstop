import { APIRoute } from "next-s3-upload";

export default APIRoute.configure({
    async key(req, filename) {
        let directory = req.body.directory;
        let user_id = req.body.user_id;
    
        return `${directory}/${user_id}`;
      }
    
});
