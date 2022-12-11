use std::{collections::HashMap, fmt};
use crate::search::Search;
use crate::ethnicity::Ethnicity;

pub struct ForceStats<'a> {
    force_name: &'a str,
    number_of_searches: usize,
    ethnicities_count: HashMap<Ethnicity, u16>,
}

impl<'a> ForceStats<'a> {
    // Constructor
    pub fn new(force_name: &'a str, searches: Vec<Search>) -> Self {
        let number_of_searches = searches.len();
        let mut ethnicities_count = HashMap::new();
        // Get the ethnicity of the person searched. Self defined is preferable.
        for search in searches {
            let mut ethnicity_enum = categorise_ethnicity(search.self_defined_ethnicity);
            if ethnicity_enum == Ethnicity::Unknown {
                ethnicity_enum = categorise_ethnicity(search.officer_defined_ethnicity);
            }
            *ethnicities_count.entry(ethnicity_enum).or_insert(0) += 1;
        }
        Self {
            force_name,
            number_of_searches,
            ethnicities_count,
        }
    }
}

impl<'a> fmt::Display for ForceStats<'a> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Police Force: {}: \nNumber of searches: {}\nBreakdown of searches: {:#?}", self.force_name, self.number_of_searches, self.ethnicities_count)
    }
}

pub fn categorise_ethnicity(verbose_ethnicity: Option<String>) -> Ethnicity {
    if verbose_ethnicity.is_none() {
        return Ethnicity::Unknown;
    } else {
        let ethnicity_string = verbose_ethnicity.unwrap();
        match ethnicity_string.as_str().trim() {
            "White" => Ethnicity::White,
            "White - Any other White background" => Ethnicity::White,
            "White - Irish" => Ethnicity::White,
            "White - Gypsy or Irish Traveller" => Ethnicity::White,
            "White - English/Welsh/Scottish/Northern Irish/British" => Ethnicity::White,
            "Black" => Ethnicity::Black,
            "Black/African/Caribbean/Black British - African" => Ethnicity::Black,
            "Black/African/Caribbean/Black British - Any other Black/African/Caribbean background" => Ethnicity::Black,
            "Black/African/Caribbean/Black British - Caribbean" => Ethnicity::Black,
            "Asian" => Ethnicity::Asian,
            "Asian/Asian British - Bangladeshi" => Ethnicity::Asian,
            "Asian/Asian British - Indian" => Ethnicity::Asian,
            "Asian/Asian British - Chinese" => Ethnicity::Asian,
            "Asian/Asian British - Pakistani" => Ethnicity::Asian,
            "Asian/Asian British - Any other Asian background" => Ethnicity::Asian,
            "Other ethnic group - Arab" => Ethnicity::Asian,
            "Mixed" => Ethnicity::Mixed,
            "Mixed/Multiple ethnic groups - White and Asian" => Ethnicity::Mixed,
            "Mixed/Multiple ethnic groups - Any other Mixed/Multiple ethnic background" => Ethnicity::Mixed,
            "Mixed/Multiple ethnic groups - White and Black Caribbean" => Ethnicity::Mixed,
            "Mixed/Multiple ethnic groups - White and Black African" => Ethnicity::Mixed,
            "Other" => Ethnicity::Unknown,
            "Other ethnic group - Not stated" => Ethnicity::Unknown,
            "Other ethnic group - Any other ethnic group" => Ethnicity::Unknown,
            _ => panic!("Unrecognised ethnicity: {}", ethnicity_string)
        }
    }
}