use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct Search {
    pub age_range: Option<String>,
    pub self_defined_ethnicity: Option<String>,
    pub gender: Option<String>,
    pub datetime: Option<String>,
    pub location: Option<Location>,
    pub officer_defined_ethnicity: Option<String>,
}

#[derive(Deserialize, Debug)]
pub struct Location {
    latitude: Option<String>,
    longitude: Option<String>,
    street: Option<Street>,

}

#[derive(Deserialize, Debug)]
pub struct Street {
    id: Option<i32>,
    name: Option<String>,
}