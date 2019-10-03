
export type BmcItem = {
  chapter: number,
  part: string | null,
  label: string,
}

export type BmcBook = {
  title: string,
  items: BmcItem[],
}

export type BmcLibrary = {
  contents: BmcBook[]
}


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


export const BMC_DATA : BmcLibrary = {
  contents: [
    BMC_LUKE
  ]
};
