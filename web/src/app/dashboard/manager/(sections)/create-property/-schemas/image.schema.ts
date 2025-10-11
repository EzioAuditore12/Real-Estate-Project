import {z} from "zod";

const maxFileSize= 5 * 1024 * 1024;

export const imageSchema = z.instanceof(File).refine(
        (file)=> [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ].includes(file.type),
        {
            error: "File should be jpg, jpeg, png"
        }
    ).refine((file)=> file.size <= maxFileSize , {
        error: "Max file size for each file is 5MB"
    })