
export type BmcItem = {
  chapter: number,
  part: string | null,
  label: string,
  heading?: string,
}

export type BmcBook = {
  title: string,
  items: BmcItem[],
}

export type BmcLibrary = {
  contents: BmcBook[]
}


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
      label: "Magi, King Herod"
    },
    {
      chapter: 3,
      part: null,
      label: "John the Baptist, Baptism of Jesus"
    },
    {
      chapter: 4,
      part: null,
      label: "Temptations of Jesus"
    },
    {
      chapter: 5,
      part: null,
      label: "Beatitudes"
    },
    {
      chapter: 6,
      part: null,
      label: "APF (Alms, Prayer, Fasting)"
    },
    {
      chapter: 7,
      part: null,
      label: "ASK (Ask, Seek, Knock)"
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
      label: "Legion"
    },
    {
      chapter: 9,
      part: null,
      label: "BPB (Bleeding Woman, Paralytic, Blind Man)"
    },
    {
      chapter: 10,
      part: null,
      label: "Twelve Disciples"
    },
    {
      chapter: 11,
      part: null,
      label: "Kingdom Invasion"
    },
    {
      chapter: 12,
      part: null,
      label: "Sabbath"
    },
    {
      chapter: 13,
      part: null,
      label: "PK (Parables of Kingdom)"
    },
    {
      chapter: 14,
      part: "a",
      label: "5-2 (5 Loaves, 2 Fish)"
    },
    {
      chapter: 14,
      part: "b",
      label: "WOW (Walking on Water)"
    },
    {
      chapter: 15,
      part: null,
      label: "7-2"
    },
    {
      chapter: 16,
      part: null,
      label: "Peter's Confession"
    },
    {
      chapter: 17,
      part: null,
      label: "Transfiguration"
    },
    {
      chapter: 18,
      part: null,
      label: "Little Children"
    },
    {
      chapter: 19,
      part: null,
      label: "Rich Young Ruler"
    },
    {
      chapter: 20,
      part: null,
      label: "Eleventh Hour Workers"
    },
    {
      chapter: 21,
      part: null,
      label: "Entering Jerusalem"
    },
    {
      chapter: 22,
      part: null,
      label: "Greatest Commandment"
    },
    {
      chapter: 23,
      part: null,
      label: "Seven Woes"
    },
    {
      chapter: 24,
      part: null,
      label: "ETS (End Times Signs)"
    },
    {
      chapter: 25,
      part: null,
      label: "TV (Talents, Virgins)"
    },
    {
      chapter: 26,
      part: null,
      label: "Arrest, Peter's Denial"
    },
    {
      chapter: 27,
      part: null,
      label: "Death on the Cross"
    },
    {
      chapter: 28,
      part: null,
      label: "Resurrection, Commission"
    },
  ]
};


const BMC_LUKE : BmcBook = {
  title: "Luke",
  items: [
    {
      chapter: 1,
      part: null,
      label: "John the Baptist"
    },
    {
      chapter: 2,
      part: null,
      label: "Birth of Jesus, SAS (Shepherds, Anna, Simeon)"
    },
    {
      chapter: 3,
      part: null,
      label: "Baptism, Genealogy of Jesus"
    },
    {
      chapter: 4,
      part: null,
      label: "Temptations"
    },
    {
      chapter: 5,
      part: null,
      label: "Jesus Calls Peter"
    },
    {
      chapter: 6,
      part: null,
      label: "Sermon on the Plain, LA (Lord of Sabbath, 12 Apostles)"
    },
    {
      chapter: 7,
      part: null,
      label: "CAN (Centurion, Alabaster Jar Woman, Nain)"
    },
    {
      chapter: 8,
      part: null,
      label: "Storm, Legion"
    },
    {
      chapter: 9,
      part: "a",
      label: "Sending out the Twelve"
    },
    {
      chapter: 9,
      part: "b",
      label: "5-2"
    },
    {
      chapter: 9,
      part: "c",
      label: "Peter's Confession"
    },
    {
      chapter: 9,
      part: "d",
      label: "Transfiguration"
    },
    {
      chapter: 10,
      part: null,
      label: "Sending out the 72, Good Samaritan, Martha vs. Mary"
    },
    {
      chapter: 11,
      part: null,
      label: "LAB6 (Lord's Prayer, ASK, Bealzebub, 6 woes)"
    },
    {
      chapter: 12,
      part: null,
      label: "Rich Fool"
    },
    {
      chapter: 13,
      part: null,
      label: "Kingdom of God Parables"
    },
    {
      chapter: 14,
      part: null,
      label: "Discipleship (3 P's)"
    },
    {
      chapter: 15,
      part: null,
      label: "Lost SCP (Sheep, Coin, Prodigal)"
    },
    {
      chapter: 16,
      part: null,
      label: "Unrighteous Manager, Poor Lazarus"
    },
    {
      chapter: 17,
      part: null,
      label: "Unworthy Servant"
    },
    {
      chapter: 18,
      part: null,
      label: "How to pray (Persistent Widow, the Pharisee and the Tax Collector)"
    },
    {
      chapter: 19,
      part: null,
      label: "Zacchaeus, Entering Jerusalem"
    },
    {
      chapter: 20,
      part: null,
      label: "Wicked Tenants, Resurrected World"
    },
    {
      chapter: 21,
      part: null,
      label: "ETS (End Times Signs)"
    },
    {
      chapter: 22,
      part: null,
      label: "Arrest (Lord's Supper, Gethsemane, Peter's Denial)"
    },
    {
      chapter: 23,
      part: null,
      label: "Death on the Cross"
    },
    {
      chapter: 24,
      part: null,
      label: "Resurrection (Emmaus)"
    },
  ]
};


const BMC_ACTS : BmcBook = {
  title: "Acts",
  items: [
    {
      chapter: 1,
      part: null,
      label: "Ascension---Promise of the Holy Spirit"
    },
    {
      chapter: 2,
      part: null,
      label: "Pentecost---Coming of the Holy Spirit"
    },
    {
      chapter: 3,
      part: null,
      label: "Lame Man---Healing of the Holy Spirit"
    },
    {
      chapter: 4,
      part: null,
      label: "Arrest of Peter and John"
    },
    {
      chapter: 5,
      part: null,
      label: "Ananias and Sapphira" // (Lying to the Holy Spirit)
    },
    {
      chapter: 6,
      part: null,
      label: "7 Deacons"
    },
    {
      chapter: 7,
      part: null,
      label: "Stephen's Martyrdom"
    },
    {
      chapter: 8,
      part: null,
      label: "Philip (Judea and Samaria Mission)"
    },
    {
      chapter: 9,
      part: null,
      label: "Saul's Conversion"
    },
    {
      chapter: 10,
      part: null,
      label: "Meeting of Cornelius and Peter"
    },
    {
      chapter: 11,
      part: null,
      label: "Mission Report, Christian"
    },
    {
      chapter: 12,
      part: null,
      label: "Peter's Escape, James' Martyrdom"
    },
    {
      chapter: 13,
      part: "a",
      label: "Antioch Sends out Missionaries"
    },
    {
      chapter: 13,
      part: "b",
      label: "The Beginning of the 1st Missionary Journey"
    },
    {
      chapter: 14,
      part: null,
      label: "1st Missionary Journey: "
        + "Cyprus--Perga--Pisidia Antioch--Iconium--Lystra--Derbe"
    },
    {
      chapter: 15,
      part: null,
      label: "The Jerusalem Council"
    },
    {
      chapter: 16,
      part: null,
      label: "2nd Missionary Journey"
    },
    {
      chapter: 16,
      part: "a",
      label: "Troas (Macedonian Vision)"
    },
    {
      chapter: 16,
      part: "b",
      label: "Philippi"
    },
    {
      chapter: 17,
      part: null,
      label: "Thessalonica--Berea--Athens"
    },
    {
      chapter: 18,
      part: "a",
      label: "Corinth"
    },
    {
      chapter: 18,
      part: "b",
      label: "The Beginning of the 3rd Missionary Journey"
    },
    {
      chapter: 19,
      part: null,
      label: "3rd Missionary Journey: Ephesus"
    },
    {
      chapter: 20,
      part: null,
      label: "Philippi--Macedonia--Achaia--Corinth--Troas (Eutychus)"
    },
    {
      chapter: 21,
      part: null,
      label: "Arrest of Paul"
    },
    {
      chapter: 22,
      part: null,
      label: "Testimony in the Barracks"
    },
    {
      chapter: 23,
      part: null,
      label: "Testimony before the Council"
    },
    {
      chapter: 24,
      part: null,
      label: "Testimony before Felix"
    },
    {
      chapter: 25,
      part: null,
      label: "Testimony before Festus"
    },
    {
      chapter: 26,
      part: null,
      label: "Testimony before Agrippa"
    },
    {
      chapter: 27,
      part: "a",
      label: "4th Missionary Journey: Depart from Sidon"
    },
    {
      chapter: 27,
      part: "b",
      label: "The Noreaster"
    },
    {
      chapter: 28,
      part: null,
      label: "Rome"
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
      label: "Sin of Gentiles"
    },
    {
      chapter: 2,
      part: null,
      label: "Sin of Jews"
    },
    {
      chapter: 3,
      part: null,
      label: "Sin of all Mankind"
    },
    {
      chapter: 4,
      part: null,
      heading: "Doctrine of Salvation",
      label: "Justification by Faith 1"
    },
    {
      chapter: 5,
      part: null,
      label: "Justification by Faith 2"
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
      heading: "Doctrine of Blessings for Israel",
      label: "Past"
    },
    {
      chapter: 10,
      part: null,
      label: "Present"
    },
    {
      chapter: 11,
      part: null,
      label: "Future"
    },
    {
      chapter: 12,
      part: null,
      heading: "Practice",
      label: "Believers' Life in Church"
    },
    {
      chapter: 13,
      part: null,
      label: "Believers' Life in Society"
    },
    {
      chapter: 14,
      part: null,
      label: "Believers' Life with One Another"
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
      label: "The Lamb"
    },
    {
      chapter: 6,
      part: null,
      label: "Judgment of 7 Seals"
    },
    {
      chapter: 7,
      part: null,
      label: "144,000 of Israel Saved, Countless Multitudes of Gentiles"
    },
    {
      chapter: 8,
      part: null,
      label: "Judgment of 7 Trumpets 1"
    },
    {
      chapter: 9,
      part: null,
      label: "Judgment of 7 Trumpets 2"
    },
    {
      chapter: 10,
      part: null,
      label: "The Little Scroll"
    },
    {
      chapter: 11,
      part: null,
      label: "The Last Trumpet"
    },
    {
      chapter: 12,
      part: null,
      label: "The Woman and the Dragon"
    },
    {
      chapter: 13,
      part: null,
      label: "Two Beasts"
    },
    {
      chapter: 14,
      part: null,
      label: "The 144,000 of the Sealed"
    },
    {
      chapter: 15,
      part: null,
      label: "Song of Salvation"
    },
    {
      chapter: 16,
      part: null,
      label: "Judgment of 7 Bowls"
    },
    {
      chapter: 17,
      part: null,
      label: "Judgment for the Great Prostitute"
    },
    {
      chapter: 18,
      part: null,
      label: "Judgment for the Great Babylon"
    },
    {
      chapter: 19,
      part: "a",
      label: "Marriage Supper of the Lamb"
    },
    {
      chapter: 19,
      part: "b",
      label: "Lake-of-Fire Judgment for Beast and False Prophet"
    },
    {
      chapter: 20,
      part: "a",
      label: "Millennial Kingdom"
    },
    {
      chapter: 20,
      part: "b",
      label: "Lake-of-Fire Judgment for Satan and Unbelievers"
    },
    {
      chapter: 21,
      part: null,
      label: "New Heaven, New Earth, New Jerusalem"
    },
    {
      chapter: 22,
      part: null,
      label: "Reigning with Jesus as Kings"
    },
  ]
};


export const BMC_DATA : BmcLibrary = {
  contents: [
    BMC_MATTHEW,
    BMC_LUKE,
    BMC_ACTS,
    BMC_ROMANS,
    BMC_REVELATION,
  ]
};
