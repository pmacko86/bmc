
export type BmcItem = {
  chapter: number,
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
      label: "War against Benjaminites"
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
      label: "BBaptism and genealogy of Jesus"
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
      label: "Churches 1: ESPT (Ephesus, Smyrna, Pergamum, Thyatira)"
    },
    {
      chapter: 3,
      part: null,
      label: "Churches 2: SPL (Sardis, Philadelphia, Laodicea)"
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
    BMC_JOSHUA,
    BMC_JUDGES,
    BMC_RUTH,
    BMC_MATTHEW,
    BMC_MARK,
    BMC_LUKE,
    BMC_JOHN,
    BMC_ACTS,
    BMC_ROMANS,
    BMC_REVELATION,
  ]
};
