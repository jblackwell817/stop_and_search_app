use force_stats::ForceStats;
use rocket::response::status::NotFound;
use rocket::fs::{NamedFile, relative};
use search::Search;
use std::path::Path;
use serde_json::Error;
use crate::cors::Cors;
#[macro_use] extern crate rocket;

#[get("/")]
async fn index() -> Option<NamedFile> {
    let path = Path::new(relative!("../front-end/build")).join("index.html");
    NamedFile::open(path).await.ok()
}

#[get("/force/<force_name>/<year>/<month>")]
async fn force(force_name: &str, year: &str, month: &str) -> Result<String, NotFound<String>> {
    let request_url = format!("https://data.police.uk/api/stops-force?force={}&date={}-{}", force_name, year, month);
    let response = reqwest::get(&request_url).await;
    match response {
        Ok(r) => {
            let msg = r.text().await.unwrap().replace("type", "search_type");
            let searches: Result<Vec<Search>, Error> = serde_json::from_str(&msg);
            match searches {
                Ok(s) => {
                    let stats = ForceStats::new(force_name, s);
                    Ok(stats.to_string())
                },
                Err(e) => {
                    println!("Error retrieving data: {}", e);
                    Err(NotFound("Error retrieving data".to_string()))
                }
            }
        },
        Err(e) => {
            println!("Invalid request: {}", e);
            Err(NotFound("Invalid request".to_string()))
        },
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Cors)
        .mount("/", routes![index])
        .mount("/", routes![force])
}

mod search;
mod force_stats;
mod ethnicity;
mod cors;