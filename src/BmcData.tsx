
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


export const BMC_DATA : BmcLibrary = {
  contents: [
    BMC_MATTHEW,
    BMC_LUKE,
    BMC_ROMANS,
  ]
};
