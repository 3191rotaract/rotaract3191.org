import React from "react";

function memberPhoto(member) {
  return member.photo || '/assets/images/placeholder.png';
}

function handlePhotoError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = '/assets/images/placeholder.png';
}

const core_team = [
  {
    id: 1,
    position: "District Rotaract Representative, RI District 3191",
    name: "Rtn. Rtr. Anirudh Kulkarni",
    photo: "/assets/team/2026-27/core-team/Anirudh.webp",
  },
  {
    id: 2,
    position: "Immediate Past DRR, RI District 3191",
    name: "Rtn. Rtr. Karthik Chikmath",
    photo: "/assets/team/2026-27/core-team/Karthik U Chikmath.jpeg",
  },
  {
    id: 3,
    position: "District Rotaract Representative Elect, RI District 3191",
    name: "Rtn. Rtr. Rohan A",
    photo: "/assets/team/2026-27/core-team/Rohan A.jpg",
  },
  {
    id: 4,
    position: "General Secretary",
    name: "PP. Rtr. Girish AR",
    photo: "/assets/team/2026-27/core-team/Girish A R.jpeg",
  },
  {
    id: 5,
    position: "District Rotaract Secretary - Admin",
    name: "PP. Rtr. Soumi Bhattacharyya",
    photo: "/assets/team/2026-27/core-team/Soumi Bhattacharyya.jpeg",
  },
  {
    id: 6,
    position: "District Rotaract Secretary - Operations",
    name: "PP. Rtr. Padma Nesar R",
    photo: "/assets/team/2026-27/core-team/Padma Nesar R.jpg",
  },
  {
    id: 7,
    position: "District Rotaract Secretary - Initiatives",
    name: "PP. Rtr. Ram M Narayanan",
    photo: "/assets/team/2026-27/core-team/Ram M Narayanan.jpeg",
  }
];

const zrrs = [
  {
    id: 1,
    position: "Zonal Rotaract Representative",
    zone: "Zone Mirage",
    name: "Rtr. Hitha Suresh",
    photo: "/assets/team/2026-27/council/Hitha.jpg",
    rtr_id: "11814610",
  },
  {
    id: 2,
    position: "Zonal Rotaract Representative",
    zone: "Zone Mirage",
    name: "Rtn. Rtr. Samarth Viswanath",
    photo: "/assets/team/2026-27/council/Samarth.png",
    rtr_id: "11330839",
  },
  {
    id: 3,
    position: "Zonal Rotaract Representative",
    zone: "Zone Rafale",
    name: "Rtr. Hemant Chhajer",
    photo: "/assets/team/2026-27/council/Hemant.jpg",
    rtr_id: "10334499",
  },
  {
    id: 4,
    position: "Zonal Rotaract Representative",
    zone: "Zone Rafale",
    name: "Rtr. Rohith K R",
    photo: "/assets/team/2026-27/council/Rohith.jpeg",
    rtr_id: "12131373",
  },
  {
    id: 5,
    position: "Zonal Rotaract Representative",
    zone: "Zone Sukhoi",
    name: "Rtn. Rtr. Gagan M",
    photo: "/assets/team/2026-27/council/Gagan.webp",
    rtr_id: "12040026",
  },
  {
    id: 6,
    position: "Zonal Rotaract Representative",
    zone: "Zone Sukhoi",
    name: "Rtr. Madan Mohan B",
    photo: "/assets/team/2026-27/council/Madan.jpg",
    rtr_id: "11457950",
  },
  {
    id: 7,
    position: "Zonal Rotaract Representative",
    zone: "Zone Tejas",
    name: "Rtr. Akhilesh R",
    photo: "/assets/team/2026-27/council/Akhilesh.png",
    rtr_id: "11930827",
  },
  {
    id: 8,
    position: "Zonal Rotaract Representative",
    zone: "Zone Tejas",
    name: "Rtn. Rtr. Akshay Kumar BS",
    photo: "/assets/team/2026-27/council/Akshay Kumar BS.jpeg",
    rtr_id: "10855989",
  },
  {
    id: 9,
    position: "Kolar Regional Representative",
    zone: "Kolar Region",
    name: "Rtr. Rahul R",
    photo: "/assets/team/2026-27/council/Rahul R.jpg",
    rtr_id: "11334174",
  },
  {
    id: 10,
    position: "Ramnagar Regional Representative",
    zone: "Ramnagar Region",
    name: "Rtr. Shashank MN",
    photo: "/assets/team/2026-27/council/Shashank MN.jpg",
    rtr_id: "11629933",
  }
];

const council = [
  {
    id: 1,
    avenue: "Vaayu - 4th Annual Rotaract District Conference",
    members: [
      {
        id: 1,
        name: "Rtr. Ajay Kumar S",
        position: "Conference Chair",
        photo: "/assets/team/2026-27/council/Ajay.webp",
        rtr_id: "11496775",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Laasya A Bhagawan",
        position: "Conference Secretary",
        photo: "/assets/team/2026-27/council/Laasya.jpeg",
        rtr_id: "11820886",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 1,
    avenue: "District Treasurer",
    members: [
      {
        id: 1,
        name: "Rtr. Dhruv Sundhesha",
        position: "District Treasurer",
        photo: "/assets/team/2026-27/council/Dhruv.jpg",
        rtr_id: "10701363",
        executive: true,
        district: false,
      },

      {
        id: 2,
        name: "Rtr. M V Karthik",
        position: "District Treasurer",
        photo: "/assets/team/2026-27/council/MVKarthik.jpg",
        rtr_id: "12131356",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Jayawanth Chandra",
        position: "District Treasury Committee",
        photo: "/assets/team/2026-27/council/Jayawanth.webp",
        rtr_id: "12427353",
        executive: false,
        district: true,
      },
      {
        id: 4,
        name: "Rtr. Rizwan Riyaz Pasha",
        position: "District Treasury Committee",
        photo: "/assets/team/2026-27/council/Rizwan.webp",
        rtr_id: "12081901",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 2,
    avenue: "District Sergeant-at-Arms",
    members: [
      {
        id: 1,
        name: "Rtr. Dhanesh Menon",
        position: "District Sergeant-at-Arms",
        photo: "/assets/team/2026-27/council/Dhanesh.jpeg",
        rtr_id: "12099126",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Smriti Subramaniam",
        position: "District Sergeant-at-Arms",
        photo: "/assets/team/2026-27/council/Smriti.jpeg",
        rtr_id: "12075534",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Lokapriya R",
        position: "District Sergeant-at-Arms",
        photo: "/assets/team/2026-27/council/Lokapriya.jpg",
        rtr_id: "123717381",
        executive: true,
        district: false,
      },
      {
        id: 4,
        name: "Rtr. Nagashree M.",
        position: "District Sergeants Committee",
        photo: "/assets/team/2026-27/council/Nagashree.webp",
        rtr_id: "123780343",
        executive: false,
        district: true,
      },
      {
        id: 5,
        name: "Rtr. Mohd Mujahid",
        position: "District Sergeants Committee",
        photo: "/assets/team/2026-27/council/Mujahid.webp",
        rtr_id: "12390914",
        executive: false,
        district: true,
      },
      {
        id: 6,
        name: "Rtr. Vidya B.",
        position: "District Sergeants Committee",
        photo: "/assets/team/2026-27/council/Vidya.webp",
        rtr_id: "12390039",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 3,
    avenue: "Club Service",
    members: [
      {
        id: 1,
        name: "PP. Rtr. Nithin M",
        position: "District Club Service Director",
        photo: "/assets/team/2026-27/council/Nithin.jpeg",
        rtr_id: "12077096",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Ayman Fathima",
        position: "District Club Service Director",
        photo: "/assets/team/2026-27/council/Ayman.jpg",
        rtr_id: "12372980",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Buvan Kumar B. N.",
        position: "District Club Service Committee",
        photo: "/assets/team/2026-27/council/Buvan.webp",
        rtr_id: "12344229",
        executive: false,
        district: true,
      },
      {
        id: 4,
        name: "Rtr. Mohammed Bilal Khan A",
        position: "District Club Service Committee",
        photo: "/assets/team/2026-27/council/Bilal.webp",
        rtr_id: "11718428",
        executive: false,
        district: true,
      },
      {
        id: 5,
        name: "Rtr. Dhruv Dan",
        position: "District Club Service Committee",
        photo: "/assets/team/2026-27/council/DhruvDan.webp",
        rtr_id: "12411853",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 4,
    avenue: "Community Service",
    members: [
      {
        id: 1,
        name: "IPP. Rtr. BS Adithya",
        position: "District Community Service Director",
        photo: "/assets/team/2026-27/council/Adithya.jpeg",
        rtr_id: "11575083",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "IPP. Rtr. Afnan Kazim",
        position: "District Community Service Director",
        photo: "/assets/team/2026-27/council/Affan.jpeg",
        rtr_id: "11500888",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Ishita Poddar",
        position: "District Community Service Director",
        photo: "/assets/team/2026-27/council/Ishita.jpeg",
        rtr_id: "12135941",
        executive: true,
        district: false,
      },
      {
        id: 4,
        name: "Rtr. Shifa Khaji Shameed",
        position: "District Community Service Committee",
        photo: "/assets/team/2026-27/council/Shifa.webp",
        rtr_id: "12434006",
        executive: false,
        district: true,
      },
      {
        id: 5,
        name: "Rtr. Janapritha Sivakumaran",
        position: "District Community Service Committee",
        photo: "/assets/team/2026-27/council/Janapritha.webp",
        rtr_id: "12531522",
        executive: false,
        district: true,
      },
      {
        id: 6,
        name: "Rtr. S S Mahalaxmi",
        position: "District Community Service Committee",
        photo: "/assets/team/2026-27/council/Mahalaxmi.webp",
        rtr_id: "12085820",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 5,
    avenue: "International Service",
    members: [
      {
        id: 1,
        name: "Rtr. Laasya A Bhagawan",
        position: "District International Service Director",
        photo: "/assets/team/2026-27/council/Laasya.jpg",
        rtr_id: "11820886",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Amritesh Sahu",
        position: "District International Service Director",
        photo: "/assets/team/2026-27/council/Amritesh.jpeg",
        rtr_id: "12392004",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Varun S.",
        position: "District International Service Director",
        photo: "/assets/team/2026-27/council/Varun.jpeg",
        rtr_id: "11559173",
        executive: true,
        district: false,
      },
      {
        id: 4,
        name: "PP. Rtr. Suresh Madhu N.",
        position: "District International Service Committee",
        photo: "/assets/team/2026-27/council/Suresh.webp",
        rtr_id: "10704989",
        executive: false,
        district: true,
      },
      {
        id: 5,
        name: "IPP. Rtr. Somashekar Chandrappa",
        position: "District International Service Committee",
        photo: "/assets/team/2026-27/council/Somashekhar.webp",
        rtr_id: "11789122",
        executive: false,
        district: true,
      },
      {
        id: 6,
        name: "Rtr. Manish Chikmath",
        position: "District International Service Committee",
        photo: "/assets/team/2026-27/council/Manish.webp",
        rtr_id: "11485239",
        executive: false,
        district: true,
      },
      {
        id: 7,
        name: "Rtr. Karthik M.S.",
        position: "District International Service Committee",
        photo: "/assets/team/2026-27/council/KarthikMS.webp",
        rtr_id: "11940246",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 6,
    avenue: "Professional Development",
    members: [
      {
        id: 1,
        name: "PP. Rtr. Tagore Maddali",
        position: "District Professional Development Director",
        photo: "/assets/team/2026-27/council/Tagore.jpg",
        rtr_id: "10040898",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "IPP. Rtr. Sameen Mehnaz Fathima",
        position: "District Professional Development Director",
        photo: "/assets/team/2026-27/council/Sameen.jpeg",
        rtr_id: "11818350",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Prithvi Raj R",
        position: "District Professional Development Director",
        photo: "/assets/team/2026-27/council/Prithvi.jpg",
        rtr_id: "11827710",
        executive: true,
        district: false,
      },
      {
        id: 4,
        name: "Rtr. Farheen Taj",
        position: "District Professional Development Committee",
        photo: "/assets/team/2026-27/council/Farheen.webp",
        rtr_id: "12095688",
        executive: false,
        district: true,
      },
      {
        id: 5,
        name: "Rtr. Rishitha A. K.",
        position: "District Professional Development Committee",
        photo: "/assets/team/2026-27/council/Rishitha.webp",
        rtr_id: "12427371",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 7,
    avenue: "Design and Visual Communication",
    members: [
      {
        id: 1,
        name: "Rtr. Govardhan K",
        position: "District Design & Visual Communications Director",
        photo: "/assets/team/2026-27/council/Govardhan.jpg",
        rtr_id: "12386548",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Deeksha A J",
        position: "District Design & Visual Communications Director",
        photo: "/assets/team/2026-27/council/Deeksha.jpg",
        rtr_id: "12391998",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Shravanth Kumar P.",
        position: "District Design & Visual Communications Committee",
        photo: "/assets/team/2026-27/council/Shravanth.webp",
        rtr_id: "12388518",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 8,
    avenue: "Editorial",
    members: [
      {
        id: 1,
        name: "Rtr. Harshitha B C",
        position: "District Editor",
        photo: "/assets/team/2026-27/council/Harshitha.jpg",
        rtr_id: "11865303",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Darshana Sankhla",
        position: "District Editor",
        photo: "/assets/team/2026-27/council/Darshana.jpeg",
        rtr_id: "11604799",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Vivek K.",
        position: "District Editorial Committee",
        photo: "/assets/team/2026-27/council/Vivek.webp",
        rtr_id: "",
        executive: false,
        district: true,
      },
      {
        id: 4,
        name: "Rtr. K.R. Sai Surabhi",
        position: "District Editorial Committee",
        photo: "",
        rtr_id: "12417595",
        executive: false,
        district: true,
      },
      {
        id: 5,
        name: "Rtr. Prachi Chawla",
        position: "District Editorial Committee",
        photo: "",
        rtr_id: "12234836",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 9,
    avenue: "Social Media",
    members: [
      {
        id: 1,
        name: "Rtr. Mohammed Saqib Pasha",
        position: "District Social Media Director",
        photo: "/assets/team/2026-27/council/Saqib.jpeg",
        rtr_id: "12199885",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Noor Fathima",
        position: "District Social Media Director",
        photo: "/assets/team/2026-27/council/Noor.jpg",
        rtr_id: "11930163",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 10,
    avenue: "Public Image",
    members: [
      {
        id: 1,
        name: "Rtr. Manoj R",
        position: "District Public Image Director",
        photo: "/assets/team/2026-27/council/ManojR.jpg",
        rtr_id: "12229688",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 11,
    avenue: "Web and Tech",
    members: [
      {
        id: 1,
        name: "Rtr. Manoj B",
        position: "District Web & Tech Director",
        photo: "/assets/team/2026-27/council/Manoj B.jpeg",
        rtr_id: "12313463",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Samkit Samsukha",
        position: "District Web & Tech Director",
        photo: "/assets/team/2026-27/council/Samkit.jpeg",
        rtr_id: "12391991",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "PP. Rtr. Moushmi",
        position: "District Web & Tech Committee",
        photo: "/assets/team/2026-27/council/Moushmi.webp",
        rtr_id: "10915596",
        executive: false,
        district: true,
      },
      {
        id: 3,
        name: "Rtr. Chandu M Hugar",
        position: "District Web & Tech Committee",
        photo: "/assets/team/2026-27/council/Chandu.webp",
        rtr_id: "10915596",
        executive: false,
        district: true,
      }
    ],
  },
  {
    id: 12,
    avenue: "Next Gen",
    members: [
      {
        id: 1,
        name: "Rtn. Rtr. Arunima Biswas",
        position: "District Next Gen Director",
        photo: "/assets/team/2026-27/council/Arunima.png",
        rtr_id: "10448331",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "IPP. Rtr. Pranav Y.",
        position: "District Next Gen Director",
        photo: "/assets/team/2026-27/council/Pranav Y.jpg",
        rtr_id: "11936762",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Kavya Shree S.",
        position: "District Next Gen Director",
        photo: "/assets/team/2026-27/council/Kavya Shree.jpg",
        rtr_id: "12227038",
        executive: true,
        district: false,
      },
      {
        id: 4,
        name: "Rtr. Aman Agarwal",
        position: "District Next Gen Committee",
        photo: "/assets/team/2026-27/council/Aman.jpeg",
        rtr_id: "11933517",
        executive: false,
        district: true,
      },
      {
        id: 5,
        name: "Rtr. Sridhatri Ramesh",
        position: "District Next Gen Committee",
        photo: "/assets/team/2026-27/council/Sridhatri.webp",
        rtr_id: "12191676",
        executive: false,
        district: true,
      },
      {
        id: 6,
        name: "Rtr. Heamann J Patel",
        position: "District Next Gen Committee",
        photo: "/assets/team/2026-27/council/Heamann.webp",
        rtr_id: "12427342",
        executive: false,
        district: true,
      },
    ],
  },
  {
    id: 13,
    avenue: "Events",
    members: [
      {
        id: 1,
        name: "Rtr. Harshita Verma",
        position: "District Director of Events",
        photo: "/assets/team/2026-27/council/Harshita Verma.jpg",
        rtr_id: "12390056",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "PP. Rtr. Likith R.",
        position: "District Director of Events",
        photo: "/assets/team/2026-27/council/Likith R.jpg",
        rtr_id: "12058056",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 14,
    avenue: "CSR + Outreach and Partnership",
    members: [
      {
        id: 1,
        name: "PP. Rtn. Rtr. Nagendra Babu",
        position: "District CSR + Outreach & Partnership",
        photo: "/assets/team/2026-27/council/Nagendra Babu.jpg",
        rtr_id: "10921917",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "Rtr. Shivani Ram K.",
        position: "District CSR + Outreach & Partnership",
        photo: "/assets/team/2026-27/council/Shivani.jpg",
        rtr_id: "11919314",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 15,
    avenue: "Environment",
    members: [
      {
        id: 1,
        name: "PP. Rtr. Ashwini N.",
        position: "District Environment Chair",
        photo: "/assets/team/2026-27/council/Ashwini N.jpg",
        rtr_id: "11442791",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 16,
    avenue: "Membership Retention and Club Development",
    members: [
      {
        id: 1,
        name: "PP. Rtr. Vaishnavi Singh Rajput",
        position: "District Membership Retention and Club Development Chair",
        photo: "/assets/team/2026-27/council/Vaishnavi Singh.jpeg",
        rtr_id: "11268118",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "IPP. Rtr. Druva N",
        position: "District Membership Retention and Club Development Chair",
        photo: "/assets/team/2026-27/council/Druva.jpg",
        rtr_id: "10214019",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 17,
    avenue: "Learning Team",
    members: [
      {
        id: 1,
        name: "IPP. Rtr. Gouthami Parthasarathy",
        position: "District Learning Facilitator",
        photo: "/assets/team/2026-27/council/Gouthami.jpeg",
        rtr_id: "10136528",
        executive: true,
        district: false,
      },
      {
        id: 2,
        name: "PP. Rtr. Aayush Mishra",
        position: "District Learning Facilitator",
        photo: "/assets/team/2026-27/council/Aayush.jpg",
        rtr_id: "11939731",
        executive: true,
        district: false,
      },
      {
        id: 3,
        name: "Rtr. Nidhi J.",
        position: "District Learning Facilitator",
        photo: "/assets/team/2026-27/council/Nidhi J.jpeg",
        rtr_id: "11933550",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 18,
    avenue: "Resource and Operations",
    members: [
      {
        id: 1,
        name: "IPP. Rtn. Rtr. Gowtham J Kumar",
        position: "District Resource & Operations Head",
        photo: "/assets/team/2026-27/council/Gowtham.png",
        rtr_id: "12183302",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 19,
    avenue: "RYLA Chair",
    members: [
      {
        id: 1,
        name: "Rtr. Vikram Murthy",
        position: "RLYA Chair",
        photo: "/assets/team/2026-27/council/Vikram.png",
        rtr_id: "",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 20,
    avenue: "World Rotaract Week Chair",
    members: [
      {
        id: 1,
        name: "PP. Rtr. Nagendra E.",
        position: "World Rotaract Week Chair",
        photo: "/assets/team/2026-27/council/Nagendra.png",
        rtr_id: "",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 21,
    avenue: "Global Grant Chair",
    members: [
      {
        id: 1,
        name: "PP. Rtr. Madhusudhan A. Kallur",
        position: "Global Grant Chair",
        photo: "/assets/team/2026-27/council/Madhusudhan.png",
        rtr_id: "",
        executive: true,
        district: false,
      },
    ],
  },
  {
    id: 22,
    avenue: "Rotary Foundation Chair",
    members: [
      {
        id: 1,
        name: "Rtn. Rtr. Samarth Viswanath",
        position: "Rotary Foundation Chair",
        photo: "/assets/team/2026-27/council/Samarth.png",
        rtr_id: "11330839",
        executive: true,
        district: false,
      },
    ],
  },
];

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-pink-200 bg-[#fff8fb] px-6 py-4 shadow-sm">
      <p className="text-xs uppercase tracking-widest text-slate-500">
        {label}
      </p>

      <h2 className="mt-1 text-2xl font-black text-[#d41367]">
        {value}
      </h2>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="my-12">
      <div className="flex items-center gap-5">
        <div className="h-px flex-1 bg-pink-200" />

        <h2 className="text-center text-lg md:text-3xl font-black uppercase tracking-[0.35em] text-[#d41367] text-shadow-sm">
          {title}
        </h2>

        <div className="h-px flex-1 bg-pink-200" />
      </div>
    </div>
  );
}

function LeadershipCard({ member }) {
  return (
    <div
      className="
  group
  overflow-hidden
  rounded-[28px]
  border
  border-pink-100
  bg-white
  shadow-lg
  transition-all
  duration-300
  hover:-translate-y-2
  hover:border-[#d41367]
  hover:shadow-2xl
"
    >
      <img
        src={memberPhoto(member)}
        onError={handlePhotoError}
        alt={member.name}
        className="
    h-[350px]
    w-full
    object-cover
    transition-transform
    duration-500
    group-hover:scale-105
  "
      />

      <div className="bg-pink-50 px-6 py-5 text-center">
        <h3 className="text-xl font-bold text-slate-900">
          {member.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {member.position}
        </p>
      </div>
    </div>
  );
}

function ZRRCard({ member }) {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-pink-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#d41367] hover:shadow-2xl">

      <div className="relative aspect-square overflow-hidden">
        <img
          src={memberPhoto(member)}
          onError={handlePhotoError}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {member.rtr_id && (
          <div className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#d41367] shadow-md backdrop-blur">
            {member.rtr_id}
          </div>
        )}
      </div>

      <div className="bg-pink-50 px-6 py-5 text-center">
        <h3 className="font-bold text-slate-900">
          {member.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {member.position}
        </p>
        <div className="mt-3 flex justify-center">
          <span className="rounded-full border border-[#d41367] bg-white px-4 py-1 text-sm tracking-widest text-[#d41367]">
            {member.zone}
          </span>
        </div>
      </div>
    </div>
  );
}

function CouncilCard({ member }) {
  return (
    <div className="group overflow-hidden rounded-[28px] border border-pink-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#d41367] hover:shadow-2xl">

      <div className="relative aspect-square overflow-hidden">
        <img
          src={memberPhoto(member)}
          onError={handlePhotoError}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {member.rtr_id && (
          <div className="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#d41367] shadow-md backdrop-blur">
            {member.rtr_id}
          </div>
        )}
      </div>

      <div className="bg-pink-50 px-6 py-5 text-center">
        <h3 className="font-bold text-slate-900">
          {member.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {member.position}
        </p>
      </div>
    </div>
  );
}

function DistrictCard({ member }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={memberPhoto(member)}
          onError={handlePhotoError}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {member.rtr_id && (
          <div className="absolute bottom-2 right-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-[#d41367] shadow">
            {member.rtr_id}
          </div>
        )}
      </div>

      <div className="bg-pink-50 p-3 text-center">
        <h3 className="text-sm font-bold text-slate-900">
          {member.name}
        </h3>

        <p className="mt-1 text-xs text-slate-600">
          {member.position}
        </p>
      </div>
    </div>
  );
}

function AvenueSection({ avenue }) {
  const executiveMembers = avenue.members.filter((m) => m.executive);
  const districtMembers = avenue.members.filter((m) => m.district);

  return (
    <section className="mb-20">
      <SectionHeader title={avenue.avenue} />

      <div className="flex flex-wrap justify-center gap-8">
        {executiveMembers.map((member) => (
          <div key={member.id} className="w-full max-w-sm md:w-[320px]">
            <CouncilCard member={member} />
          </div>
        ))}
      </div>

      {/* District Team */}
      {districtMembers.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {districtMembers.map((member) => (
              <div key={member.id} className="w-[280px]">
                <DistrictCard member={member} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default function Team() {
  return (
    <div className="relative min-h-screen text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HERO */}

        <section
          className="
          rounded-[40px]
          border
          border-pink-200
          bg-white/85
          p-4
          shadow-[0_20px_80px_rgba(212,19,103,0.08)]
          backdrop-blur-xl
          md:px-12 md:py-6
        "
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p
                className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.45em]
                text-[#d41367]
              "
              >
                District Command Center
              </p>

              <h1 className="mt-1 text-5xl font-black md:text-5xl">
                THE TEAM
              </h1>

              <p className="mt-1 max-w-2xl text-lg text-slate-600">
                Meet the leaders, visionaries and changemakers
                driving service, fellowship, leadership and
                impact across Rotaract District 3191.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <StatCard label="Zones" value="4" />
            </div>
          </div>
        </section>

        {/* CORE TEAM */}

        <SectionHeader title="District Core Team" />

        <div className="grid gap-10 lg:grid-cols-3">
          {core_team.map((member) => (
            <LeadershipCard
              key={member.id}
              member={member}
            />
          ))}
        </div>

        {/* ZONAL TEAM */}

        <SectionHeader title="Zonal Rotaract Representatives" />

        <div className="grid gap-10 lg:grid-cols-4 items-center justify-center">
          {zrrs.map((member) => (
            <ZRRCard
              key={member.id}
              member={member}
            />
          ))}
        </div>
        <div className="space-y-12">
          {council.map((avenue) => (
            <AvenueSection
              key={avenue.id}
              avenue={avenue}
            />
          ))}
        </div>

      </main>
    </div>
  );
}
