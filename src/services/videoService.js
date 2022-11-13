import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://juavocuafvqfxyazrfeq.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1YXZvY3VhZnZxZnh5YXpyZmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjIxMDcsImV4cCI6MTk4Mzc5ODEwN30.jqQODryYG5fGQ-w98zcNFj7yv_jYNUNjQsMsmDGv_s8";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video").select("*")            
        }
    }
}