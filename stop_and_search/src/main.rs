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

#[get("/force/<force_name>")]
async fn force(force_name: &str) -> Result<String, NotFound<String>> {
    let months = vec!["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
    let mut all_searches = Vec::new();
    for month in months {
        let searches = force_by_month(force_name, "2022", month).await;
        match searches {
            Ok(mut s) => all_searches.append(&mut s),
            Err(_e) => ()
        }
    }
    let stats = ForceStats::new(force_name, all_searches);
    Ok(stats.to_string())
}

/// Get the data for a police force for a particular month
async fn force_by_month(force_name: &str, year: &str, month: &str) -> Result<Vec<Search>, ()> {
    let request_url = format!("https://data.police.uk/api/stops-force?force={}&date={}-{}", force_name, year, month);
    let response = reqwest::get(&request_url).await;
    match response {
        Ok(r) => {
            let msg = r.text().await.unwrap().replace("type", "search_type");
            let searches: Result<Vec<Search>, Error> = serde_json::from_str(&msg);
            match searches {
                Ok(s) => Ok(s),
                Err(_e) => Err(())
            }
        },
        Err(e) => {
            println!("Invalid request: {}", e);
            Err(())
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