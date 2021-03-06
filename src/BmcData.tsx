
export type BmcItem = {
  chapter: number | string,
  part: string | null,
  label: string,
  heading?: string,
}

export type BmcBook = {
  title: string,
  notes?: string[],
  items: BmcItem[],
}

export type BmcLibrary = {
  contents: BmcBook[]
}


const BMC_GENESIS : BmcBook = {
  title: "Genesis",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Creation"
    },
    {
      chapter: 2,
      part: null,
      label: "Garden of Eden/Adam and Eve"
    },
    {
      chapter: 3,
      part: null,
      label: "Fall"
    },
    {
      chapter: 4,
      part: null,
      label: "Cain and Abel"
    },
    {
      chapter: 5,
      part: null,
      label: "Genealogy of Adam"
    },
    {
      chapter: 6,
      part: null,
      label: "Noah builds the Ark"
    },
    {
      chapter: 7,
      part: null,
      label: "Great Flood"
    },
    {
      chapter: 8,
      part: null,
      label: "End of the Flood"
    },
    {
      chapter: 9,
      part: null,
      label: "Covenant of the Rainbow"
    },
    {
      chapter: 10,
      part: null,
      label: "Genealogy of Noah"
    },
    {
      chapter: 11,
      part: null,
      label: "Tower of Babel, genealogy of Shem"
    },
    {
      chapter: 12,
      part: null,
      label: "Call of Abram"
    },
    {
      chapter: 13,
      part: null,
      label: "Lot leaves Abram"
    },
    {
      chapter: 14,
      part: null,
      label: "Melchizedek"
    },
    {
      chapter: 15,
      part: null,
      label: "Abram's righteousness through faith, God's land covenant"
    },
    {
      chapter: 16,
      part: null,
      label: "Birth of Ishmael"
    },
    {
      chapter: 17,
      part: null,
      label: "Names changed to Abraham and Sarah, covenant of circumcision"
    },
    {
      chapter: 18,
      part: null,
      label: "Intercessory prayer"
    },
    {
      chapter: 19,
      part: null,
      label: "Destruction of Sodom and Gomorrah"
    },
    {
      chapter: 20,
      part: null,
      label: "Abraham's lie/God's protection"
    },
    {
      chapter: 21,
      part: null,
      label: "Birth of Isaac"
    },
    {
      chapter: 22,
      part: null,
      label: "Sacrifice of Isaac"
    },
    {
      chapter: 23,
      part: null,
      label: "Death of Sarah, burial in Machpelah"
    },
    {
      chapter: 24,
      part: "a",
      label: "Rebekah in Haran"
    },
    {
      chapter: 24,
      part: "b",
      label: "Marriage of Isaac and Rebekah"
    },
    {
      chapter: 25,
      part: null,
      label: "Death of Abraham, birth of Esau and Jacob"
    },
    {
      chapter: 26,
      part: null,
      label: "Treaty between Isaac and Abimelech"
    },
    {
      chapter: 27,
      part: null,
      label: "Isaac blesses Jacob"
    },
    {
      chapter: 28,
      part: null,
      label: "Vow at Bethel"
    },
    {
      chapter: 29,
      part: null,
      label: "Jacob, Laban, Leah, Rachel"
    },
    {
      chapter: 30,
      part: null,
      label: "Jacob's prosperity"
    },
    {
      chapter: 31,
      part: null,
      label: "Jacob's return"
    },
    {
      chapter: 32,
      part: null,
      label: "Jacob wrestles with God/name changed to Israel"
    },
    {
      chapter: 33,
      part: null,
      label: "Meeting Esau"
    },
    {
      chapter: 34,
      part: null,
      label: "Dinah incident"
    },
    {
      chapter: 35,
      part: null,
      label: "El-Bethel covenant renewal, death of Isaac"
    },
    {
      chapter: 36,
      part: null,
      label: "Genealogy of Esau"
    },
    {
      chapter: 37,
      part: null,
      label: "Joseph is sold by his brothers"
    },
    {
      chapter: 38,
      part: null,
      label: "Judah and Tamar"
    },
    {
      chapter: 39,
      part: null,
      label: "Joseph is falsely accused"
    },
    {
      chapter: 40,
      part: null,
      label: "Dreams of cupbearer and baker"
    },
    {
      chapter: 41,
      part: null,
      label: "Joseph the Prime Minister"
    },
    {
      chapter: 42,
      part: null,
      label: "Meeting the brothers 1"
    },
    {
      chapter: 43,
      part: null,
      label: "Meeting the brothers 2"
    },
    {
      chapter: 44,
      part: null,
      label: "Benjamin/silver cup"
    },
    {
      chapter: 45,
      part: null,
      label: "Joseph makes himself known to his brothers"
    },
    {
      chapter: 46,
      part: null,
      label: "Jacob's family moves to Egypt (70 people)"
    },
    {
      chapter: 47,
      part: null,
      label: "Settling in Goshen"
    },
    {
      chapter: 48,
      part: null,
      label: "Jacob blesses Ephraim and Manasseh"
    },
    {
      chapter: 49,
      part: null,
      label: "Jacob blesses his 12 sons"
    },
    {
      chapter: 50,
      part: null,
      label: "Death of Jacob and Joseph"
    },
  ]
};

const BMC_EXODUS : BmcBook = {
  title: "Exodus",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Suffering"
    },
    {
      chapter: 2,
      part: null,
      label: "Moses"
    },
    {
      chapter: 3,
      part: null,
      label: "Calling"
    },
    {
      chapter: 4,
      part: null,
      label: "Return"
    },
    {
      chapter: 5,
      part: null,
      label: "Meeting Pharaoh"
    },
    {
      chapter: 6,
      part: null,
      label: "Promise"
    },
    {
      chapter: 7,
      part: null,
      label: "Blood"
    },
    {
      chapter: 8,
      part: null,
      label: "FGF (frogs, gnats, flies)"
    },
    {
      chapter: 9,
      part: null,
      label: "PBH (pestilence, boils, hail)"
    },
    {
      chapter: 10,
      part: null,
      label: "LD (locusts, darkness)"
    },
    {
      chapter: 11,
      part: null,
      label: "Warning of the firstborns' death"
    },
    {
      chapter: 12,
      part: null,
      label: "Passover"
    },
    {
      chapter: 13,
      part: null,
      label: "Escape"
    },
    {
      chapter: 14,
      part: null,
      label: "Crossing Red Sea"
    },
    {
      chapter: 15,
      part: null,
      label: "Song of salvation, bitter water"
    },
    {
      chapter: 16,
      part: null,
      label: "Manna"
    },
    {
      chapter: 17,
      part: null,
      label: "Meribah 1, Amalekites"
    },
    {
      chapter: 18,
      part: null,
      label: "Jethro/delegation"
    },
    {
      chapter: 19,
      part: null,
      label: "Sinai Covenant"
    },
    {
      chapter: 20,
      part: null,
      label: "Ten Commandments"
    },
    {
      chapter: 21,
      part: null,
      label: "Laws concerning life"
    },
    {
      chapter: 22,
      part: null,
      label: "Laws concerning property"
    },
    {
      chapter: 23,
      part: null,
      label: "Laws concerning feasts"
    },
    {
      chapter: 24,
      part: null,
      label: "Covenant wedding ceremony"
    },
    {
      chapter: 25,
      part: null,
      label: "ATG (Ark of the Covenant, table for bread, golden lampstand)"
    },
    {
      chapter: 26,
      part: null,
      label: "Veil"
    },
    {
      chapter: 27,
      part: null,
      label: "Altar"
    },
    {
      chapter: 28,
      part: null,
      label: "Priestly garments"
    },
    {
      chapter: 29,
      part: null,
      label: "Priestly regulations"
    },
    {
      chapter: 30,
      part: null,
      label: "Basin"
    },
    {
      chapter: 31,
      part: null,
      label: "Skilled workers"
    },
    {
      chapter: 32,
      part: null,
      label: "Golden calf"
    },
    {
      chapter: 33,
      part: null,
      label: "Intercession"
    },
    {
      chapter: 34,
      part: null,
      label: "Second tablets of the Ten Commandments"
    },
    {
      chapter: 35,
      part: null,
      label: "Offerings"
    },
    {
      chapter: 36,
      part: null,
      label: "Tabernacle construction begins"
    },
    {
      chapter: 37,
      part: null,
      label: "ATGI (Ark of the Covenant, table for bread, "
        + "golden lampstand, altar of incense)"
    },
    {
      chapter: 38,
      part: null,
      label: "AB (altar, basin)"
    },
    {
      chapter: 39,
      part: null,
      label: "Completion of priestly garments/completion of tabernacle"
    },
    {
      chapter: 40,
      part: null,
      label: "Dedication"
    },
  ]
};

const BMC_LEVITICUS : BmcBook = {
  title: "Leviticus",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Burnt offering"
    },
    {
      chapter: 2,
      part: null,
      label: "Grain offering"
    },
    {
      chapter: 3,
      part: null,
      label: "Peace offering"
    },
    {
      chapter: 4,
      part: null,
      label: "Sin offering"
    },
    {
      chapter: 5,
      part: null,
      label: "Guilt offering (for restitution)"
    },
    {
      chapter: 6,
      part: null,
      label: "Duties of priests 1"
    },
    {
      chapter: 7,
      part: null,
      label: "Duties of priests 2"
    },
    {
      chapter: 8,
      part: null,
      label: "Consecration of priests"
    },
    {
      chapter: 9,
      part: null,
      label: "Aaron's first sacrifice"
    },
    {
      chapter: 10,
      part: null,
      label: "Death of Nadab and Abihu"
    },
    {
      chapter: 11,
      part: null,
      label: "CU (clean-unclean) food"
    },
    {
      chapter: 12,
      part: null,
      label: "Purification after childbirth"
    },
    {
      chapter: 13,
      part: null,
      label: "Laws for leprosy"
    },
    {
      chapter: 14,
      part: null,
      label: "Laws for cleansing lepers"
    },
    {
      chapter: 15,
      part: null,
      label: "Laws about bodily discharges"
    },
    {
      chapter: 16,
      part: null,
      label: "The Day of Atonement"
    },
    {
      chapter: 17,
      part: null,
      label: "Laws for blood"
    },
    {
      chapter: 18,
      part: null,
      label: "Sexual morality 1"
    },
    {
      chapter: 19,
      part: null,
      label: "Be holy"
    },
    {
      chapter: 20,
      part: null,
      label: "Sexual morality 2"
    },
    {
      chapter: 21,
      part: null,
      label: "Qualifications for priests"
    },
    {
      chapter: 22,
      part: null,
      label: "Portions of priests"
    },
    {
      chapter: 23,
      part: null,
      label: "7 feasts"
    },
    {
      chapter: 24,
      part: null,
      label: "LBB (lamp, bread of the Presence, blasphemer)"
    },
    {
      chapter: 25,
      part: null,
      label: "Sabbath year (every 7 years), Jubilee (every 50 years)"
    },
    {
      chapter: 26,
      part: null,
      label: "BC (blessings, curses)"
    },
    {
      chapter: 27,
      part: null,
      label: "Vows, tithes"
    },
  ]
};

const BMC_NUMBERS : BmcBook = {
  title: "Numbers",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Census of Israel's army (603,550)"
    },
    {
      chapter: 2,
      part: null,
      label: "Formation of camps"
    },
    {
      chapter: 3,
      part: null,
      label: "Number of all Levites (1 month and up -- 22,000)"
    },
    {
      chapter: 4,
      part: null,
      label: "Number of Levites in ministry (30-50 years old -- 8,580)"
    },
    {
      chapter: 5,
      part: null,
      label: "3 Purification laws (camp, sin, marriage)"
    },
    {
      chapter: 6,
      part: null,
      label: "Nazarite laws"
    },
    {
      chapter: 7,
      part: null,
      label: "Leaders' offerings"
    },
    {
      chapter: 8,
      part: null,
      label: "Consecration of Levites"
    },
    {
      chapter: 9,
      part: null,
      label: "Second Passover"
    },
    {
      chapter: 10,
      part: null,
      label: "Departure"
    },
    {
      chapter: 11,
      part: null,
      label: "Grumbling of the Israelites"
    },
    {
      chapter: 12,
      part: null,
      label: "Grumbling of Miriam and Aaron"
    },
    {
      chapter: 13,
      part: null,
      label: "12 spies"
    },
    {
      chapter: 14,
      part: null,
      label: "40-year punishment"
    },
    {
      chapter: 15,
      part: null,
      label: "Summary of sacrifices"
    },
    {
      chapter: 16,
      part: null,
      label: "Rebellion of Korah, Dathan, Abiram"
    },
    {
      chapter: 17,
      part: null,
      label: "Budding of Aaron's staff"
    },
    {
      chapter: 18,
      part: null,
      label: "Duties and portions of priests and Levites"
    },
    {
      chapter: 19,
      part: null,
      label: "Purification laws"
    },
    {
      chapter: 20,
      part: "a",
      label: "Meribah 2"
    },
    {
      chapter: 20,
      part: "b",
      label: "Aaron's death on Mt. Hor"
    },
    {
      chapter: 21,
      part: "a",
      label: "Bronze snake"
    },
    {
      chapter: 21,
      part: "b",
      label: "Conquest of Heshbon, Bashan"
    },
    {
      chapter: "22-25",
      part: null,
      label: "Balaam-Balak incident"
    },
    {
      chapter: 26,
      part: null,
      label: "Census of Israel's army (601,730)"
    },
    {
      chapter: 27,
      part: null,
      label: "Joshua the new leader"
    },
    {
      chapter: 28,
      part: null,
      label: "Feasts 1"
    },
    {
      chapter: 29,
      part: null,
      label: "Feasts 2"
    },
    {
      chapter: 30,
      part: null,
      label: "Vows"
    },
    {
      chapter: 31,
      part: null,
      label: "Revenge against the Midianites"
    },
    {
      chapter: 32,
      part: null,
      label: "Division of land (east of Jordan)"
    },
    {
      chapter: 33,
      part: null,
      label: "Summary of wilderness journey"
    },
    {
      chapter: 34,
      part: null,
      label: "Boundaries of land (west of Jordan)"
    },
    {
      chapter: 35,
      part: null,
      label: "Cities of refuge"
    },
    {
      chapter: 36,
      part: null,
      label: "Law of land inheritance for daughters "
        + "(Zelophehad's daughters)"
    },
  ]
};

const BMC_DEUTERONOMY : BmcBook = {
  title: "Deuteronomy",
  items: [
    {
      chapter: 1,
      part: null,
      heading: "Summary of Numbers",
      label: "12 spies"
    },
    {
      chapter: 2,
      part: null,
      label: "Conquest of Heshbon"
    },
    {
      chapter: 3,
      part: null,
      label: "Conquest of Bashan, Moses forbidden to "
        + "enter the Promised Land"
    },
    {
      chapter: 4,
      part: null,
      label: "Moses' exhortation"
    },
    {
      chapter: 5,
      part: null,
      heading: "Summary of Exodus",
      label: "Ten Commandments"
    },
    {
      chapter: 6,
      part: null,
      label: "Shema"
    },
    {
      chapter: 7,
      part: null,
      label: "Destroy completely!"
    },
    {
      chapter: 8,
      part: null,
      label: "Do not forget!"
    },
    {
      chapter: 9,
      part: null,
      label: "Golden calf"
    },
    {
      chapter: 10,
      part: null,
      label: "Second tablets of the Ten Commandments, "
        + "Circumcise your heart!"
    },
    {
      chapter: 11,
      part: null,
      label: "BC 1 (blessings, curses)"
    },
    {
      chapter: 12,
      part: null,
      heading: "Summary of Leviticus",
      label: "Pagan idols"
    },
    {
      chapter: 13,
      part: null,
      label: "Israelite idols"
    },
    {
      chapter: 14,
      part: null,
      label: "CU (clean, unclean) food"
    },
    {
      chapter: 15,
      part: null,
      label: "Sabbath year"
    },
    {
      chapter: 16,
      part: null,
      label: "3 feasts (Passover, Weeks, Booths)"
    },
    {
      chapter: 17,
      part: null,
      label: "Laws concerning kings"
    },
    {
      chapter: 18,
      part: null,
      label: "Provision for priests, promise for a prophet like Moses"
    },
    {
      chapter: 19,
      part: null,
      label: "Cities of refuge"
    },
    {
      chapter: 20,
      part: null,
      label: "Laws concerning warfare"
    },
    {
      chapter: 21,
      part: null,
      label: "Miscellaneous laws 1"
    },
    {
      chapter: 22,
      part: null,
      label: "Sexual morality"
    },
    {
      chapter: 23,
      part: null,
      label: "ACV (assembly, camp, vow)"
    },
    {
      chapter: 24,
      part: null,
      label: "Miscellaneous laws 2"
    },
    {
      chapter: 25,
      part: null,
      label: "Miscellaneous laws 3"
    },
    {
      chapter: 26,
      part: null,
      label: "Tithes"
    },
    {
      chapter: 27,
      part: null,
      heading: "Covenant in the plains of Moab",
      label: "Curses"
    },
    {
      chapter: 28,
      part: null,
      label: "BC 2 (blessings, curses)"
    },
    {
      chapter: 29,
      part: null,
      label: "Covenant in the plains of Moab 1"
    },
    {
      chapter: 30,
      part: null,
      label: "Covenant in the plains of Moab 2"
    },
    {
      chapter: 31,
      part: null,
      label: "Moses commissions Joshua as his successor"
    },
    {
      chapter: 32,
      part: null,
      label: "Song of Moses"
    },
    {
      chapter: 33,
      part: null,
      label: "Blessing of Moses"
    },
    {
      chapter: 34,
      part: null,
      label: "Death of Moses"
    },
  ]
};

const BMC_JOSHUA : BmcBook = {
  title: "Joshua",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Preparation for conquest"
    },
    {
      chapter: 2,
      part: null,
      label: "Two spies/Rahab"
    },
    {
      chapter: 3,
      part: null,
      label: "Crossing the Jordan"
    },
    {
      chapter: 4,
      part: null,
      label: "Memorial stones"
    },
    {
      chapter: 5,
      part: null,
      label: "CPMC (circumcision, Passover, manna, the Commander)"
    },
    {
      chapter: 6,
      part: null,
      label: "Conquest of Jericho"
    },
    {
      chapter: 7,
      part: null,
      label: "Achan's sin"
    },
    {
      chapter: 8,
      part: null,
      label: "Conquest of Ai"
    },
    {
      chapter: 9,
      part: null,
      label: "Gibeonite deception"
    },
    {
      chapter: 10,
      part: null,
      label: "Conquest of the south (\"Sun, stand still\")"
    },
    {
      chapter: 11,
      part: null,
      label: "Conquest of the north"
    },
    {
      chapter: 12,
      part: null,
      label: "Summary of conquest (33 kings)"
    },
    {
      chapter: 13,
      part: null,
      label: "Division of the land (east of Jordan)"
    },
    {
      chapter: 14,
      part: null,
      label: "Caleb's hill country"
    },
    {
      chapter: 15,
      part: null,
      label: "Tribe of Judah"
    },
    {
      chapter: 16,
      part: null,
      label: "Tribe of Ephraim"
    },
    {
      chapter: 17,
      part: null,
      label: "Tribe of Manasseh"
    },
    {
      chapter: 18,
      part: null,
      label: "Tribe of Benjamin"
    },
    {
      chapter: 19,
      part: null,
      label: "Other tribes"
    },
    {
      chapter: 20,
      part: null,
      label: "Cities of refuge"
    },
    {
      chapter: 21,
      part: null,
      label: "Cities of the Levites (48)"
    },
    {
      chapter: 22,
      part: null,
      label: "Altar of Witness"
    },
    {
      chapter: 23,
      part: null,
      label: "Joshua's farewell sermon"
    },
    {
      chapter: 24,
      part: null,
      label: "Shechem Covenant"
    },
  ]
};

const BMC_JUDGES : BmcBook = {
  title: "Judges",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Failure in conquest"
    },
    {
      chapter: 2,
      part: null,
      label: "Spiritual failure"
    },
    {
      chapter: 3,
      part: null,
      label: "Othniel, Ehud, Shamgar"
    },
    {
      chapter: 4,
      part: "a",
      label: "Deborah at the hill country of Ephraim"
    },
    {
      chapter: 4,
      part: "b",
      label: "Victory of Deborah and Barak"
    },
    {
      chapter: 5,
      part: null,
      label: "Song of victory"
    },
    {
      chapter: 6,
      part: null,
      label: "Calling of Gideon"
    },
    {
      chapter: 7,
      part: null,
      label: "Gideon's victory"
    },
    {
      chapter: 8,
      part: null,
      label: "Gideon's idol"
    },
    {
      chapter: 9,
      part: null,
      label: "Abimelech the evildoer"
    },
    {
      chapter: 10,
      part: null,
      label: "Tola, Jair"
    },
    {
      chapter: 11,
      part: null,
      label: "Jephthah"
    },
    {
      chapter: 12,
      part: null,
      label: "Jephthah's conflict with Ephraim, Ibzan, Elon, Abdon"
    },
    {
      chapter: 13,
      part: null,
      label: "Samson's birth"
    },
    {
      chapter: 14,
      part: null,
      label: "Samson's marriage"
    },
    {
      chapter: 15,
      part: null,
      label: "Samson's victory"
    },
    {
      chapter: 16,
      part: null,
      label: "Samson and Delilah"
    },
    {
      chapter: 17,
      part: null,
      label: "Micah's idol"
    },
    {
      chapter: 18,
      part: null,
      label: "Danites' idol"
    },
    {
      chapter: 19,
      part: null,
      label: "A Levite and his concubine"
    },
    {
      chapter: 20,
      part: null,
      label: "War against [the] Benjaminites"
    },
    {
      chapter: 21,
      part: null,
      label: "Preservation of the Benjaminites"
    },
  ]
};

const BMC_RUTH : BmcBook = {
  title: "Ruth",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Naomi and her family sojourn in Moab, "
        + "Ruth follows Naomi to Bethlehem"
    },
    {
      chapter: 2,
      part: null,
      label: "Ruth meets Boaz"
    },
    {
      chapter: 3,
      part: null,
      label: "Kinsman-redeemer"
    },
    {
      chapter: 4,
      part: null,
      label: "Boaz marries Ruth (Obed--Jesse--David)"
    },
  ]
};

const BMC_1_SAMUEL : BmcBook = {
  title: "1 Samuel",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Hannah's prayer"
    },
    {
      chapter: 2,
      part: null,
      label: "Eli's sin, birth of Samuel"
    },
    {
      chapter: 3,
      part: null,
      label: "Calling of Samuel"
    },
    {
      chapter: 4,
      part: null,
      label: "Capture of the Ark"
    },
    {
      chapter: 5,
      part: null,
      label: "Plagues of the Ark"
    },
    {
      chapter: 6,
      part: null,
      label: "Return of the Ark"
    },
    {
      chapter: 7,
      part: null,
      label: "Mizpah revival"
    },
    {
      chapter: 8,
      part: null,
      label: "Request for king"
    },
    {
      chapter: 9,
      part: null,
      label: "Meeting of Saul and Samuel"
    },
    {
      chapter: 10,
      part: null,
      label: "Anointing of Saul"
    },
    {
      chapter: 11,
      part: null,
      label: "Ammonite war"
    },
    {
      chapter: 12,
      part: null,
      label: "Samuel's farewell sermon"
    },
    {
      chapter: 13,
      part: null,
      label: "Saul's foolish sacrifice"
    },
    {
      chapter: 14,
      part: null,
      label: "Jonathan's victory by faith"
    },
    {
      chapter: 15,
      part: null,
      label: "To obey is better than sacrifice"
    },
    {
      chapter: 16,
      part: null,
      label: "Anointing of David"
    },
    {
      chapter: 17,
      part: null,
      label: "David kills Goliath"
    },
    {
      chapter: 18,
      part: null,
      label: "Meeting of David and Jonathan, Saul's jealousy 1"
    },
    {
      chapter: 19,
      part: null,
      label: "Saul's jealousy 2"
    },
    {
      chapter: 20,
      part: null,
      label: "Friendship of David and Jonathan"
    },
    {
      chapter: 21,
      part: null,
      label: "Escape to Nob"
    },
    {
      chapter: 22,
      part: null,
      label: "Adullam 400"
    },
    {
      chapter: 23,
      part: null,
      label: "Saving Keilah"
    },
    {
      chapter: 24,
      part: null,
      label: "Corner of Saul's robe"
    },
    {
      chapter: 25,
      part: null,
      label: "Samuel's death, marriage to Abigail"
    },
    {
      chapter: 26,
      part: null,
      label: "Saul's spear and water jug"
    },
    {
      chapter: 27,
      part: null,
      label: "Receiving Ziklag"
    },
    {
      chapter: 28,
      part: null,
      label: "Medium of Endor"
    },
    {
      chapter: 29,
      part: null,
      label: "Philistines distrust David"
    },
    {
      chapter: 30,
      part: null,
      label: "Revenge against the Amalekites"
    },
    {
      chapter: 31,
      part: null,
      label: "Saul's death"
    },
  ]
};

const BMC_2_SAMUEL : BmcBook = {
  title: "2 Samuel",
  items: [
    {
      chapter: 1,
      part: null,
      label: "David's lament"
    },
    {
      chapter: 2,
      part: null,
      label: "King of Judah in Hebron (7 years)"
    },
    {
      chapter: 3,
      part: null,
      label: "Abner's death"
    },
    {
      chapter: 4,
      part: null,
      label: "Ish-bosheth's death"
    },
    {
      chapter: 5,
      part: null,
      label: "King of all Israel in Jerusalem (33 years)"
    },
    {
      chapter: 6,
      part: null,
      label: "The Ark of the Covenant brought to Jerusalem"
    },
    {
      chapter: 7,
      part: null,
      label: "Davidic Covenant (Nathan's Oracle)"
    },
    {
      chapter: 8,
      part: null,
      label: "Military victories"
    },
    {
      chapter: 9,
      part: null,
      label: "Mephibosheth at king's table"
    },
    {
      chapter: 10,
      part: null,
      label: "Ammonite war"
    },
    {
      chapter: 11,
      part: null,
      label: "Bathsheba"
    },
    {
      chapter: 12,
      part: null,
      label: "Nathan's rebuke / David's repentance"
    },
    {
      chapter: 13,
      part: null,
      label: "Break-up of the family"
    },
    {
      chapter: 14,
      part: null,
      label: "Absalom's escape and return"
    },
    {
      chapter: 15,
      part: null,
      label: "Absalom's mutiny"
    },
    {
      chapter: 16,
      part: null,
      label: "Shimei curses David"
    },
    {
      chapter: 17,
      part: null,
      label: "Two strategies (Hushai vs. Ahithophel)"
    },
    {
      chapter: 18,
      part: null,
      label: "Absalom's death"
    },
    {
      chapter: 19,
      part: null,
      label: "David's return"
    },
    {
      chapter: 20,
      part: null,
      label: "Sheba's mutiny"
    },
    {
      chapter: 21,
      part: null,
      label: "Avenging the Gibeonites"
    },
    {
      chapter: 22,
      part: null,
      label: "David's testimony"
    },
    {
      chapter: 23,
      part: null,
      label: "David's last words and his mighty men"
    },
    {
      chapter: 24,
      part: null,
      label: "David's foolish census / Araunah's (= Ornan) threshing floor"
    },
  ]
};

const BMC_1_KINGS : BmcBook = {
  title: "1 Kings",
  items: [
    {
      chapter: 1,
      part: null,
      label: "King Solomon"
    },
    {
      chapter: 2,
      part: null,
      label: "Purge"
    },
    {
      chapter: 3,
      part: null,
      label: "Solomon's wisdom"
    },
    {
      chapter: 4,
      part: null,
      label: "Prosperity 1"
    },
    {
      chapter: 5,
      part: null,
      label: "Preparation for Temple construction"
    },
    {
      chapter: 6,
      part: null,
      label: "Temple construction begins"
    },
    {
      chapter: 7,
      part: null,
      label: "Construction of palace, Temple furnishings"
    },
    {
      chapter: 8,
      part: null,
      label: "The Ark of the Covenant brought to the Temple"
    },
    {
      chapter: 9,
      part: null,
      label: "Solomonic Covenant"
    },
    {
      chapter: 10,
      part: null,
      label: "Prosperity 2 (Queen of Sheba)"
    },
    {
      chapter: 11,
      part: null,
      label: "Fall and death of Solomon"
    },
    {
      chapter: 12,
      part: null,
      label: "Divided Kingdom"
    },
    {
      chapter: 12,
      part: "S",
      label: "Rehoboam"
    },
    {
      chapter: 12,
      part: "N",
      label: "Jeroboam"
    },
    {
      chapter: 13,
      part: null,
      label: "Old prophet and young prophet"
    },
    {
      chapter: 14,
      part: null,
      label: "Shishak invasion"
    },
    {
      chapter: 15,
      part: "S",
      label: "Abijam (= Abijah), Asa, Jehoshaphat"
    },
    {
      chapter: 15,
      part: "N",
      label: "Nadab, Baasha"
    },
    {
      chapter: 16,
      part: null,
      label: "Elah, Zimri, Omri, Ahab"
    },
    {
      chapter: 17,
      part: "a",
      label: "Elijah at Brook Cherith"
    },
    {
      chapter: 17,
      part: "b",
      label: "Elijah at Zarephath"
    },
    {
      chapter: 18,
      part: null,
      label: "Elijah at Mt. Carmel"
    },
    {
      chapter: 19,
      part: null,
      label: "Elijah at Mt. Horeb (= Mt. Sinai)"
    },
    {
      chapter: 20,
      part: null,
      label: "Wars with Syria"
    },
    {
      chapter: 21,
      part: null,
      label: "Naboth's vineyard"
    },
    {
      chapter: 22,
      part: null,
      label: "Ahab's death"
    },
  ]
};

const BMC_2_KINGS : BmcBook = {
  title: "2 Kings",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Ahaziah"
    },
    {
      chapter: 2,
      part: null,
      label: "Ascension of Elijah (chariots of fire)"
    },
    {
      chapter: 3,
      part: null,
      label: "Jehoram (= Joram)"
    },
    {
      chapter: 4,
      part: null,
      label: "Elisha's 4 miracles"
    },
    {
      chapter: 5,
      part: null,
      label: "Naaman"
    },
    {
      chapter: 6,
      part: null,
      label: "God protects Elisha"
    },
    {
      chapter: 7,
      part: null,
      label: "4 lepers"
    },
    {
      chapter: 8,
      part: "N",
      label: "Shunammite woman's land"
    },
    {
      chapter: 8,
      part: "S",
      label: "Jehoram (= Joram), Ahaziah"
    },
    {
      chapter: 9,
      part: null,
      label: "Jehu"
    },
    {
      chapter: 10,
      part: null,
      label: "Jehu's purge"
    },
    {
      chapter: 11,
      part: null,
      label: "Athaliah"
    },
    {
      chapter: 12,
      part: null,
      label: "Jehoash (= Joash)"
    },
    {
      chapter: 13,
      part: null,
      label: "Jehoahaz, Jehoash (= Joash)"
    },
    {
      chapter: 14,
      part: "S",
      label: "Amaziah"
    },
    {
      chapter: 14,
      part: "N",
      label: "Jeroboam II"
    },
    {
      chapter: 15,
      part: "S",
      label: "Azariah (= Uzziah), Jotham"
    },
    {
      chapter: 15,
      part: "N",
      label: "Zechariah, Shallum, Menahem, Pekahiah, Pekah"
    },
    {
      chapter: 16,
      part: null,
      label: "Ahaz"
    },
    {
      chapter: 17,
      part: null,
      label: "Hoshea (last king of Israel)"
    },
    {
      chapter: 18,
      part: null,
      label: "Hezekiah"
    },
    {
      chapter: 19,
      part: null,
      label: "Hekekiah's prayer"
    },
    {
      chapter: 20,
      part: null,
      label: "Hezekiah's illness"
    },
    {
      chapter: 21,
      part: null,
      label: "Manasseh, Amon"
    },
    {
      chapter: 22,
      part: null,
      label: "Josiah (Book of the Law found)"
    },
    {
      chapter: 23,
      part: "a",
      label: "Josiah's reforms"
    },
    {
      chapter: 23,
      part: "b",
      label: "Jehoahaz"
    },
    {
      chapter: 24,
      part: null,
      label: "Jehoiakim, Jehoiachin, Zedekiah (last king of Judah)"
    },
    {
      chapter: 25,
      part: null,
      label: "Fall of Judah"
    },
  ]
};

const BMC_1_CHRONICLES : BmcBook = {
  title: "1 Chronicles",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Genealogy of Adam"
    },
    {
      chapter: 2,
      part: null,
      label: "Genealogy of Judah"
    },
    {
      chapter: 3,
      part: null,
      label: "Genealogy of David"
    },
    {
      chapter: 4,
      part: null,
      label: "Southern tribes"
    },
    {
      chapter: 5,
      part: null,
      label: "Eastern tribes"
    },
    {
      chapter: 6,
      part: null,
      label: "Levites"
    },
    {
      chapter: 7,
      part: null,
      label: "Northern tribes"
    },
    {
      chapter: 8,
      part: null,
      label: "Tribe of Benjamin"
    },
    {
      chapter: 9,
      part: null,
      label: "List of returned exiles"
    },
    {
      chapter: 10,
      part: null,
      label: "Saul's death"
    },
    {
      chapter: 11,
      part: null,
      label: "King David"
    },
    {
      chapter: 12,
      part: null,
      label: "David's mighty men"
    },
    {
      chapter: 13,
      part: null,
      label: "Uzzah's death"
    },
    {
      chapter: 14,
      part: null,
      label: "David's fame"
    },
    {
      chapter: 15,
      part: null,
      label: "The Ark of the Covenant brought to Jerusalem"
    },
    {
      chapter: 16,
      part: null,
      label: "David's prayer of thanksgiving"
    },
    {
      chapter: 17,
      part: null,
      label: "Davidic Covenant (Nathan's Oracle)"
    },
    {
      chapter: 18,
      part: null,
      label: "Early victories of war"
    },
    {
      chapter: 19,
      part: null,
      label: "Late victories of war"
    },
    {
      chapter: 20,
      part: null,
      label: "Ammonite war"
    },
    {
      chapter: 21,
      part: null,
      label: "David's foolish census/Ornan's (= Araunah) threshing floor"
    },
    {
      chapter: 22,
      part: null,
      label: "Preparation for Temple construction"
    },
    {
      chapter: 23,
      part: null,
      label: "Duties of Levites"
    },
    {
      chapter: 24,
      part: null,
      label: "Duties of priests"
    },
    {
      chapter: 25,
      part: null,
      label: "Duties of musicians"
    },
    {
      chapter: 26,
      part: null,
      label: "Duties of gatekeepers"
    },
    {
      chapter: 27,
      part: null,
      label: "Military and administrative organization"
    },
    {
      chapter: 28,
      part: null,
      label: "David's charge to Solomon to build the Temple"
    },
    {
      chapter: 29,
      part: null,
      label: "Offerings for Temple construction"
    },
  ]
};

const BMC_2_CHRONICLES : BmcBook = {
  title: "2 Chronicles",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Solomon's wisdom"
    },
    {
      chapter: 2,
      part: null,
      label: "Preparation for Temple construction"
    },
    {
      chapter: 3,
      part: null,
      label: "Temple construction begins"
    },
    {
      chapter: 4,
      part: null,
      label: "Temple furnishings"
    },
    {
      chapter: 5,
      part: null,
      label: "The Ark of the Covenant brought to the Temple"
    },
    {
      chapter: 6,
      part: null,
      label: "Solomon's dedication prayer and thanksgiving"
    },
    {
      chapter: 7,
      part: null,
      label: "Dedication of the Temple/Feast of Tabernacles"
    },
    {
      chapter: 8,
      part: null,
      label: "Prosperity"
    },
    {
      chapter: 9,
      part: null,
      label: "Solomon's death"
    },
    {
      chapter: 10,
      part: null,
      label: "Divided kingdom -- Rehoboam"
    },
    {
      chapter: 11,
      part: null,
      label: "Rehoboam strengthens kingdom"
    },
    {
      chapter: 12,
      part: null,
      label: "Shishak invasion"
    },
    {
      chapter: 13,
      part: null,
      label: "Abijah (= Abijam)"
    },
    {
      chapter: 14,
      part: null,
      label: "Reign of Asa"
    },
    {
      chapter: 15,
      part: null,
      label: "Asa's reforms"
    },
    {
      chapter: 16,
      part: null,
      label: "Hanani rebukes Asa (verse 9)"
    },
    {
      chapter: 17,
      part: null,
      label: "Jehoshaphat's reforms"
    },
    {
      chapter: 18,
      part: null,
      label: "Ahab's death"
    },
    {
      chapter: 19,
      part: null,
      label: "Jehu (son of Hanani) rebukes Jehoshaphat"
    },
    {
      chapter: 20,
      part: null,
      label: "Jehoshaphat's prayer"
    },
    {
      chapter: 21,
      part: null,
      label: "Jehoram (= Joram)"
    },
    {
      chapter: 22,
      part: null,
      label: "Ahaziah"
    },
    {
      chapter: 23,
      part: null,
      label: "Athaliah"
    },
    {
      chapter: 24,
      part: null,
      label: "Joash (= Jehoash)"
    },
    {
      chapter: 25,
      part: null,
      label: "Amaziah"
    },
    {
      chapter: 26,
      part: null,
      label: "Uzziah (= Azariah)"
    },
    {
      chapter: 27,
      part: null,
      label: "Jotham"
    },
    {
      chapter: 28,
      part: null,
      label: "Ahaz"
    },
    {
      chapter: 29,
      part: null,
      label: "Hezekiah cleanses Temple"
    },
    {
      chapter: 30,
      part: null,
      label: "Hezekiah restores Passover"
    },
    {
      chapter: 31,
      part: null,
      label: "Hezekiah's reforms"
    },
    {
      chapter: 32,
      part: null,
      label: "Hezekiah's death"
    },
    {
      chapter: 33,
      part: null,
      label: "Manasseh, Amon"
    },
    {
      chapter: 34,
      part: null,
      label: "Josiah's reforms"
    },
    {
      chapter: 35,
      part: null,
      label: "Josiah's grand Passover celebration"
    },
    {
      chapter: 36,
      part: null,
      label: "Jehoahaz, Jehoiakim, Jehoiachin, "
        + "Zedekiah (last king of Judah)"
    },
  ]
};

const BMC_MATTHEW : BmcBook = {
  title: "Matthew",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Genealogy, Birth of Jesus"
    },
    {
      chapter: 2,
      part: null,
      label: "Magi, Herod"
    },
    {
      chapter: 3,
      part: null,
      label: "John the Baptist/Baptism of Jesus"
    },
    {
      chapter: 4,
      part: null,
      label: "Temptations of Jesus"
    },
    {
      chapter: 5,
      part: null,
      label: "Beatitudes:"
    },
    {
      chapter: 5,
      part: "1",
      label: "Poor in Spirit"
    },
    {
      chapter: 5,
      part: "2",
      label: "Mourn"
    },
    {
      chapter: 5,
      part: "3",
      label: "Meek"
    },
    {
      chapter: 5,
      part: "4",
      label: "Hungry and thirsty for righteousness"
    },
    {
      chapter: 5,
      part: "5",
      label: "Merciful"
    },
    {
      chapter: 5,
      part: "6",
      label: "Pure in heart"
    },
    {
      chapter: 5,
      part: "7",
      label: "Peacemakers"
    },
    {
      chapter: 5,
      part: "8",
      label: "Persecuted"
    },
    {
      chapter: 6,
      part: null,
      label: "APF (alms, prayer, fasting)"
    },
    {
      chapter: 7,
      part: null,
      label: "ASK (ask, seek, knock)"
    },
    {
      chapter: 8,
      part: "a",
      label: "Centurion"
    },
    {
      chapter: 8,
      part: "b",
      label: "Storm"
    },
    {
      chapter: 8,
      part: "c",
      label: "Two demoniacs"
    },
    {
      chapter: 9,
      part: null,
      label: "PBB (paralytic, bleeding woman, blind men)"
    },
    {
      chapter: 10,
      part: null,
      label: "12 disciples: "
        + "Peter--Andrew, James--John, Philip--Bartholomew, "
        + "Thomas--Matthew, James--Thaddaeus, Simon--Judas"
    },
    {
      chapter: 11,
      part: null,
      label: "\"Come to me\""
    },
    {
      chapter: 12,
      part: null,
      label: "Sabbath"
    },
    {
      chapter: 13,
      part: null,
      label: "PK (parables of Kingdom)"
    },
    {
      chapter: 14,
      part: "a",
      label: "Death of John the Baptist"
    },
    {
      chapter: 14,
      part: "b",
      label: "Five loaves and two fish"
    },
    {
      chapter: 14,
      part: "c",
      label: "Walking on water"
    },
    {
      chapter: 15,
      part: "a",
      label: "Hypocrisy of elders' tradition"
    },
    {
      chapter: 15,
      part: "b",
      label: "Canaanite woman (= Syrophoenician woman)"
    },
    {
      chapter: 15,
      part: "c",
      label: "Seven loaves and a few fish"
    },
    {
      chapter: 16,
      part: null,
      label: "Peter's confession"
    },
    {
      chapter: 17,
      part: null,
      label: "Transfiguration"
    },
    {
      chapter: 18,
      part: null,
      label: "Little children"
    },
    {
      chapter: 19,
      part: null,
      label: "Rich Young Ruler"
    },
    {
      chapter: 20,
      part: "a",
      label: "11th-hour worker"
    },
    {
      chapter: 20,
      part: "b",
      label: "Two blind men"
    },
    {
      chapter: 21,
      part: null,
      label: "Triumphal Entry of Jesus, cleansing the Temple"
    },
    {
      chapter: 22,
      part: null,
      label: "Great Commandment"
    },
    {
      chapter: 23,
      part: null,
      label: "7 woes"
    },
    {
      chapter: 24,
      part: null,
      label: "SET (signs of the end times)"
    },
    {
      chapter: 25,
      part: null,
      label: "VT (virgin, talent parables)"
    },
    {
      chapter: 26,
      part: null,
      label: "Alabaster jar, Lord's Supper, Gethsemane, arrest, "
        + "Peter's denial and repentance"
    },
    {
      chapter: 27,
      part: null,
      label: "Death on the Cross"
    },
    {
      chapter: 28,
      part: null,
      label: "Resurrection, Great Commission"
    },
  ]
};

const BMC_MARK : BmcBook = {
  title: "Mark",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Beginning of the gospel of Jesus"
    },
    {
      chapter: 2,
      part: null,
      label: "Paralytic, call of Levi (= Matthew), fasting controversy"
    },
    {
      chapter: 3,
      part: null,
      label: "Jesus calls the Twelve"
    },
    {
      chapter: 4,
      part: null,
      label: "Parables of the Kingdom, storm"
    },
    {
      chapter: 5,
      part: "a",
      label: "Demoniac"
    },
    {
      chapter: 5,
      part: "b",
      label: "Bleeding woman, Jairus' daughter"
    },
    {
      chapter: 6,
      part: "a",
      label: "Sending out the Twelve"
    },
    {
      chapter: 6,
      part: "b",
      label: "Death of John the Baptist"
    },
    {
      chapter: 6,
      part: "c",
      label: "Five loaves and two fish"
    },
    {
      chapter: 6,
      part: "d",
      label: "Walking on water"
    },
    {
      chapter: 7,
      part: "a",
      label: "Hypocrisy of elders' traditions"
    },
    {
      chapter: 7,
      part: "b",
      label: "Syrophoenician woman (= Canaanite woman)"
    },
    {
      chapter: 8,
      part: "a",
      label: "Seven loaves and a few fish"
    },
    {
      chapter: 8,
      part: "b",
      label: "Second touch"
    },
    {
      chapter: 8,
      part: "c",
      label: "Peter's confession"
    },
    {
      chapter: 9,
      part: null,
      label: "Transfiguration"
    },
    {
      chapter: 10,
      part: "a",
      label: "Rich young ruler, servanthood (verse 45)"
    },
    {
      chapter: 10,
      part: "b",
      label: "Bartimaeus"
    },
    {
      chapter: 11,
      part: null,
      label: "Triumphal Entry of Jesus, cleansing the Temple"
    },
    {
      chapter: 12,
      part: null,
      label: "Wicked tenants, resurrection controversy, "
        + "Great Commandment, widow's two coins"
    },
    {
      chapter: 13,
      part: null,
      label: "SET (signs of the end times)"
    },
    {
      chapter: 14,
      part: null,
      label: "Alabaster jar, Lord's Supper, Gethsemane, arrest, "
        + "Peter's denial and repentance"
    },
    {
      chapter: 15,
      part: null,
      label: "Death on the Cross"
    },
    {
      chapter: 16,
      part: null,
      label: "Resurrection, Great Commission, ascension"
    },
  ]
};

const BMC_LUKE : BmcBook = {
  title: "Luke",
  items: [
    {
      chapter: 1,
      part: null,
      label: "John the Baptist, Mary and Elizabeth"
    },
    {
      chapter: 2,
      part: null,
      label: "Birth of Jesus: SAS (shepherds, Anna, Simeon)"
    },
    {
      chapter: 3,
      part: null,
      label: "Baptism and genealogy of Jesus"
    },
    {
      chapter: 4,
      part: null,
      label: "Temptations of Jesus"
    },
    {
      chapter: 5,
      part: null,
      label: "Jesus calls Peter"
    },
    {
      chapter: 6,
      part: null,
      label: "Jesus calls the Twelve, Sermon on the plain"
    },
    {
      chapter: 7,
      part: null,
      label: "CNA (centurion, Nain, alabaster jar)"
    },
    {
      chapter: 8,
      part: "a",
      label: "Storm"
    },
    {
      chapter: 8,
      part: "b",
      label: "Demoniac"
    },
    {
      chapter: 8,
      part: "c",
      label: "Jairus' daughter"
    },
    {
      chapter: 9,
      part: "a",
      label: "Sending out the Twelve"
    },
    {
      chapter: 9,
      part: "b",
      label: "Five loaves and two fish"
    },
    {
      chapter: 9,
      part: "c",
      label: "Peter's confession"
    },
    {
      chapter: 9,
      part: "d",
      label: "Transfiguration"
    },
    {
      chapter: 10,
      part: null,
      label: "Sending out the seventy-two, Good Samaritan"
    },
    {
      chapter: 11,
      part: null,
      label: "LAB6 (Lord's Prayer, ask-seek-knock, Beelzebul, 6 woes)"
    },
    {
      chapter: 12,
      part: null,
      label: "Rich fool"
    },
    {
      chapter: 13,
      part: null,
      label: "Repent! Enter through the narrow door!"
    },
    {
      chapter: 14,
      part: null,
      label: "Cost of discipleship (3 P's)"
    },
    {
      chapter: 15,
      part: null,
      label: "Return of the prodigal son" //Lost SCP (Sheep, Coin, Prodigal)"
    },
    {
      chapter: 16,
      part: null,
      label: "Shrewd manager, poor Lazarus"
    },
    {
      chapter: 17,
      part: null,
      label: "Unworthy servant"
    },
    {
      chapter: 18,
      part: null,
      label: "How to pray (persistent widow, tax collector)"
    },
    {
      chapter: 19,
      part: "a",
      label: "Zacchaeus"
    },
    {
      chapter: 19,
      part: "b",
      label: "Triumphal Entry of Jesus, cleansing the Temple"
    },
    {
      chapter: 20,
      part: null,
      label: "Wicked tenants, resurrection controversy"
    },
    {
      chapter: 21,
      part: null,
      label: "Widow's two coins, SET (signs of the end times)"
    },
    {
      chapter: 22,
      part: null,
      label: "Lord's Supper, Gethsemane, arrest, "
        + "Peter's denial and repentance"
    },
    {
      chapter: 23,
      part: null,
      label: "Death on the Cross"
    },
    {
      chapter: 24,
      part: null,
      label: "Resurrection, road to Emmaus, ascension"
    },
  ]
};

const BMC_JOHN : BmcBook = {
  title: "John",
  notes: [
    "(* after the \"I AM\" expressions)",
  ],
  items: [
    {
      chapter: 1,
      part: null,
      label: "Word, Lamb of God"
    },
    {
      chapter: 2,
      part: "a",
      label: "Wedding at Cana"
    },
    {
      chapter: 2,
      part: "b",
      label: "Cleansing the Temple"
    },
    {
      chapter: 3,
      part: null,
      label: "Nicodemus"
    },
    {
      chapter: 4,
      part: null,
      label: "Samaritan woman"
    },
    {
      chapter: 5,
      part: null,
      label: "Invalid at the Bethesda Pool"
    },
    {
      chapter: 6,
      part: null,
      label: "Five loaves and two fish, The Bread of life*"
    },
    {
      chapter: 7,
      part: null,
      label: "Feast of Booths/Rivers of Living Water (Holy Spirit)"
    },
    {
      chapter: 8,
      part: null,
      label: "Adulterous woman, The Light of the world*"
    },
    {
      chapter: 9,
      part: null,
      label: "Healing a blind man"
    },
    {
      chapter: 10,
      part: null,
      label: "The Door of the sheep*, The Good Shepherd*"
    },
    {
      chapter: 11,
      part: null,
      label: "Raising Lazarus, The Resurrection and the Life*"
    },
    {
      chapter: 12,
      part: null,
      label: "Grain of wheat"
    },
    {
      chapter: 13,
      part: null,
      label: "Lord's Supper, washing feet, New Commandment"
    },
    {
      chapter: 14,
      part: null,
      label: "The Way, the Truth, and the Life*"
    },
    {
      chapter: 15,
      part: null,
      label: "The Vine*"
    },
    {
      chapter: 16,
      part: null,
      label: "Holy Spirit the Helper"
    },
    {
      chapter: 17,
      part: null,
      label: "High priestly prayer of Jesus"
    },
    {
      chapter: 18,
      part: null,
      label: "Arrest, Peter's denial"
    },
    {
      chapter: 19,
      part: null,
      label: "Death on the Cross"
    },
    {
      chapter: 20,
      part: null,
      label: "Resurrection"
    },
    {
      chapter: 21,
      part: null,
      label: "Feed my sheep"
    },
  ]
};

const BMC_ACTS : BmcBook = {
  title: "Acts",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Promise of Holy Spirit, Great Commission, ascension, "
        + "choosing of Matthias"
    },
    {
      chapter: 2,
      part: null,
      label: "Pentecost (coming of Holy Spirit), "
        + "birth of the Jerusalem church"
    },
    {
      chapter: 3,
      part: null,
      label: "Healing of the lame man"
    },
    {
      chapter: 4,
      part: null,
      label: "Peter and John before the Sanhedrin"
    },
    {
      chapter: 5,
      part: null,
      label: "Death of Ananias and Sapphira"
    },
    {
      chapter: 6,
      part: null,
      label: "7 deacons"
    },
    {
      chapter: 7,
      part: null,
      label: "Stephen's martyrdom"
    },
    {
      chapter: 8,
      part: null,
      label: "Philip the deacon/Judea and Samaria mission"
    },
    {
      chapter: 9,
      part: null,
      label: "Saul's conversion on the road to Damascus"
    },
    {
      chapter: 10,
      part: null,
      label: "Meeting of Cornelius and Peter"
    },
    {
      chapter: 11,
      part: "a",
      label: "Peter's mission report"
    },
    {
      chapter: 11,
      part: "b",
      label: "\"Christians\""
    },
    {
      chapter: 12,
      part: null,
      label: "James' martyrdom, Peter's escape, Herod Agrippa's death"
    },
    {
      chapter: 13,
      part: "a",
      label: "Commissioning of missionaries (Saul and Barnabas)"
    },
    {
      chapter: 13,
      part: "b",
      label: "First missionary journey begins: "
        + "Antioch--Cyprus (Saul becomes Paul)--Perga--Pisidia Antioch"
    },
    {
      chapter: 14,
      part: null,
      label: "First missionary journey continues: "
        + "Iconium--Lystra--Derbe--Lystra--Iconium--"
        + "Pisidia Antioch--Perga--Attalia--Antioch"
    },
    {
      chapter: 15,
      part: "a",
      label: "Jerusalem Council"
    },
    {
      chapter: 15,
      part: "b",
      label: "Second missionary journey begins "
        + "(Parting of Paul and Barnabas): Antioch--Syria--Cilicia"
    },
    {
      chapter: 16,
      part: null,
      label: "Second missionary journey continues: "
        + "Derbe--Lystra--Troas--Neapolis--Philippi"
    },
    {
      chapter: 16,
      part: "a",
      label: "Lystra: Timothy joins Paul"
    },
    {
      chapter: 16,
      part: "b",
      label: "Troas: Macedonian Call, Luke joins Paul"
    },
    {
      chapter: 16,
      part: "c",
      label: "Philippi: Lydia, jailer"
    },
    {
      chapter: 17,
      part: null,
      label: "Second missionary journey continues:"
    },
    {
      chapter: 17,
      part: "a",
      label: "Thessalonica"
    },
    {
      chapter: 17,
      part: "b",
      label: "Berea"
    },
    {
      chapter: 17,
      part: "c",
      label: "Athens"
    },
    {
      chapter: 18,
      part: null,
      label: "Second missionary journey continues: "
        + "Corinth--Cenchreae--Ephesus--Caesarea--Jerusalem--Antioch"
    },
    {
      chapter: 18,
      part: "a",
      label: "Corinth: Aquila and Priscilla"
    },
    {
      chapter: 18,
      part: "b",
      label: "Cenchreae: Paul's vow"
    },
    {
      chapter: 18,
      part: null,
      label: "Third missionary journey begins, "
        + "Priscilla and Aquila teach Apollos in Ephesus"
    },
    {
      chapter: 19,
      part: null,
      label: "Third missionary journey continues"
    },
    {
      chapter: 19,
      part: null,
      label: "Ephesus: Hall of Tyrannus, great revival, riot"
    },
    {
      chapter: 20,
      part: null,
      label: "Third missionary journey continues: "
        + "Macedonia--Greece (Corinth)--Philippi--Troas--Miletus"
    },
    {
      chapter: 20,
      part: "a",
      label: "Troas: Eutychus"
    },
    {
      chapter: 20,
      part: "b",
      label: "Miletus: Farewell with Ephesian elders"
    },
    {
      chapter: 21,
      part: null,
      label: "Third missionary journey continues: "
        + "Tyre--Caesarea--Jerusalem"
    },
    {
      chapter: 21,
      part: "a",
      label: "Tyre: Warning 1 by disciples"
    },
    {
      chapter: 21,
      part: "b",
      label: "Caesarea: Warning 2 by Agabus"
    },
    {
      chapter: 21,
      part: "c",
      label: "Jerusalem: Paul's arrest"
    },
    {
      chapter: 22,
      part: null,
      label: "Defense in the Temple"
    },
    {
      chapter: 23,
      part: null,
      label: "Defense before the Sanhedrin, "
        + "Paul strengthened by Jesus in a vision"
    },
    {
      chapter: 24,
      part: null,
      label: "Defense before Felix"
    },
    {
      chapter: 25,
      part: null,
      label: "Defense before Festus/appeal to Caesar"
    },
    {
      chapter: 26,
      part: null,
      label: "Defense before Herod Agrippa II"
    },
    {
      chapter: 27,
      part: null,
      label: "Fourth missionary journey begins: "
        + "Caesarea--Sidon--Fair Havens"
    },
    {
      chapter: 27,
      part: "a",
      label: "Caesarea: Fourth missionary journey begins"
    },
    {
      chapter: 27,
      part: "b",
      label: "Northeaster: Shipwreck"
    },
    {
      chapter: 28,
      part: null,
      label: "Fourth missionary journey continues: Malta--Rome"
    },
    {
      chapter: 28,
      part: "a",
      label: "Malta: Snake incident"
    },
    {
      chapter: 28,
      part: "b",
      label: "Rome: Arrival, unhindered preaching of the gospel"
    },
  ]
};

const BMC_ROMANS : BmcBook = {
  title: "Romans",
  items: [
    {
      chapter: 1,
      part: null,
      heading: "Doctrine of Sin",
      label: "Gentiles' Sin"
    },
    {
      chapter: 2,
      part: null,
      label: "Jews' Sin"
    },
    {
      chapter: 3,
      part: null,
      label: "Sin of all mankind"
    },
    {
      chapter: 4,
      part: null,
      heading: "Doctrine of Salvation",
      label: "Justification by faith 1"
    },
    {
      chapter: 5,
      part: null,
      label: "Justification by faith 2"
    },
    {
      chapter: 6,
      part: null,
      heading: "Doctrine of Sanctification",
      label: "Baptism"
    },
    {
      chapter: 7,
      part: null,
      label: "Law"
    },
    {
      chapter: 8,
      part: null,
      label: "Spirit"
    },
    {
      chapter: 9,
      part: null,
      heading: "Blessings of Israel",
      label: "Israel's past"
    },
    {
      chapter: 10,
      part: null,
      label: "Israel's present"
    },
    {
      chapter: 11,
      part: null,
      label: "Israel's future"
    },
    {
      chapter: 12,
      part: null,
      heading: "Christian Practice",
      label: "Believers' life in the Church"
    },
    {
      chapter: 13,
      part: null,
      label: "Believers' life in Society"
    },
    {
      chapter: 14,
      part: null,
      label: "Believers' life with one another"
    },
    {
      chapter: 15,
      part: null,
      heading: "",
      label: "Summary"
    },
    {
      chapter: 16,
      part: null,
      label: "Greetings"
    },
  ]
};

const BMC_REVELATION : BmcBook = {
  title: "Revelation",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Revelation of Jesus"
    },
    {
      chapter: 2,
      part: null,
      label: "7 churches 1: ESPT (Ephesus, Smyrna, Pergamum, Thyatira)"
    },
    {
      chapter: 3,
      part: null,
      label: "7 churches 2: SPL (Sardis, Philadelphia, Laodicea)"
    },
    {
      chapter: 4,
      part: null,
      label: "Throne of God"
    },
    {
      chapter: 5,
      part: null,
      label: "Worthy is the Lamb"
    },
    {
      chapter: 6,
      part: null,
      label: "Judgment of 7 seals (6 seals are opened)"
    },
    {
      chapter: 7,
      part: null,
      label: "The 144,000 of Israel saved, "
        + "countless multitude of Gentiles"
    },
    {
      chapter: 8,
      part: null,
      label: "7th seal is opened, "
        + "Judgment of 7 trumpets begins (1-4 trumpets)"
    },
    {
      chapter: 9,
      part: null,
      label: "Judgment of 7 trumpets continues (5, 6 trumpets)"
    },
    {
      chapter: 10,
      part: null,
      label: "The little scroll"
    },
    {
      chapter: 11,
      part: null,
      label: "The 7th trumpet"
    },
    {
      chapter: 12,
      part: null,
      label: "The woman and the dragon"
    },
    {
      chapter: 13,
      part: null,
      label: "Two beasts"
    },
    {
      chapter: 14,
      part: null,
      label: "The 144,000 of the sealed"
    },
    {
      chapter: 15,
      part: null,
      label: "Song of Moses and the Lamb"
    },
    {
      chapter: 16,
      part: null,
      label: "Judgment of 7 bowls"
    },
    {
      chapter: 17,
      part: null,
      label: "Judgment for the great Prostitute"
    },
    {
      chapter: 18,
      part: null,
      label: "Judgment for the great Babylon"
    },
    {
      chapter: 19,
      part: "a",
      label: "Marriage supper of the Lamb"
    },
    {
      chapter: 19,
      part: "b",
      label: "The Rider on a white horse (King of kings, Lord of lords)"
    },
    {
      chapter: 19,
      part: "c",
      label: "Lake-of-fire judgment for the Beast and False Prophet"
    },
    {
      chapter: 20,
      part: "a",
      label: "Millennial Kingdom"
    },
    {
      chapter: 20,
      part: "b",
      label: "Lake-of-fire judgment for Satan and unbelievers"
    },
    {
      chapter: 21,
      part: null,
      label: "New Heaven and a New Earth, New Jerusalem"
    },
    {
      chapter: 22,
      part: null,
      label: "Reigning with Jesus forever, \"Come, Lord Jesus!\""
    },
  ]
};


export const BMC_DATA : BmcLibrary = {
  contents: [
    BMC_GENESIS,
    BMC_EXODUS,
    BMC_LEVITICUS,
    BMC_NUMBERS,
    BMC_DEUTERONOMY,
    BMC_JOSHUA,
    BMC_JUDGES,
    BMC_RUTH,
    BMC_1_SAMUEL,
    BMC_2_SAMUEL,
    BMC_1_KINGS,
    BMC_2_KINGS,
    BMC_1_CHRONICLES,
    BMC_2_CHRONICLES,
    BMC_MATTHEW,
    BMC_MARK,
    BMC_LUKE,
    BMC_JOHN,
    BMC_ACTS,
    BMC_ROMANS,
    BMC_REVELATION,
  ]
};
