/// The possible ethnicities in a stop and search. These are very broad categories and may 
/// be broken down into subcategories in the future.
#[derive(Eq, PartialEq, Hash, Debug)]
pub enum Ethnicity {
    White,
    Black,
    Asian,
    Mixed,
    Unknown,
}