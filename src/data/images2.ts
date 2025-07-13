import axios from "axios";

export async function loadImages() {
  
  try {
    const response = await axios({
      baseURL: import.meta.env.VITE_BACKENDURL,
      method: "get",
      url: "/admin/product/list",
    });
    //let products = response.data;
    //console.log(response.data)
    let images = [];
    response.data.forEach(prod => {
      images.push(
        {
    id: prod._id,
    src: prod.images[0],
     srcSet:prod.images[1],
    alt: prod.name_english,
    href: `/product/${prod._id}`,
    category:prod.category._id
  }
      )
      
    });
    console.log(images)
    return images; // Optional: return the data for external use
  } catch (error) {
    console.error('Error loading products:', error);
    
  } 
}
export const images = [
  {
    id: 1,
    src: "/p11.jpeg",
     srcSet:"/p11.jpeg",
    alt: "Strapless Oasis Linen Dress",
    href: `/product/1`
  },
  {
    id: 2,
    src: "/p22.jpeg",
   srcSet:"/p22.jpeg",
   alt: "Printed Silk Long Dress",
    href: "/product/2"
  },
  {
    id: 3,
    src: "/p33.jpeg",
    srcSet:"/p33.jpeg",
    alt: "Printed Chiffon Oasis Dress",
    href: "/product/3"
  },
  {
    id: 4,
    src: "/p43.jpeg",
    srcSet:"/p43.jpeg",
    alt: "Lace Long Dress",
    href: "/product/4"
  },
 /* {
    id: 5,
    src: "/p52.jpeg",
    srcSet:"/p52.jpeg",
    alt: "Embroidered Tulle Midi Dress",
     href: "/product/5"
  }*/,
  {
    id: 5,
    src: "/p63.jpeg",
    srcSet:"/p63.jpeg",
    alt: "Printed Silk Long Dress",
     href: "/product/6"
  },
  {
     id: 6,
    src: "/p71.jpeg",
    srcSet:"/p71.jpeg",
    alt: "Oasis Printed Linen Dress",
    href: "/product/7"
  },
  {
    id: 7,
    src: "/p81.jpeg",
    srcSet:"/p81.jpeg",
    alt: "Printed Sequins Long Dress",
    href: "/product/8"
  },
  {
     id: 8,
    src: "/p91.jpeg",
    srcSet:"/p91.jpeg",
    alt: "Bead Embroidered Long Dress",
     href: "/product/9"
  },
  {
     id: 9,
    src: "/p101.jpeg",
    srcSet:"/p101.jpeg",
    alt: "Printed Sequins Long Dress",
    href: "/product/10"
  },
  {
    id: 10,
    src: "/p112.jpeg",
    srcSet:"/p112.jpeg",
    alt: "Organdy Cotton Shirt",
     href: "/product/11"
  },
  {
     id: 11,
    src: "/p123.jpeg",
    srcSet:"/p123.jpeg",
    alt: "Printed Silk Long Dress",
    href: "/product/12"
  }
    ,
  {
     id: 12,
    src: "/p131.jpeg",
    srcSet:"/p131.jpeg",
    alt: "Cady Dress with Metallic Necklace",
    href: "/product/13"
  }
    ,
  {
    id: 13,
    src: "/p142.jpeg",
    srcSet:"/p142.jpeg",
    alt: "Silk Dress with Metallic Necklace",
    href: "/product/14"
  }
    
  
 ,
  {
    id: 14,
    src: "/p151.jpeg",
    srcSet:"/p151.jpeg",
    alt: "Embroidered Organza Top",
     href: "/product/15"
  }
    ,
  {
    id: 15,
    src: "/p162.jpeg",
    srcSet:"/p162.jpeg",
    alt: "Embroidered Organza Midi Skirt",
    href: "/product/16"
  }
    ,
  {
      id: 16,
    src: "/p171.jpeg",
    srcSet:"/p171.jpeg",
    alt: "Scalloped Lace Shirt",
    href: "/product/17"
  },
  {
    id: 17,
    src: "/p181.jpeg",
    srcSet:"/p181.jpeg",
    alt: "Scalloped Lace Pants",
    href: "/product/18"
  },
  {
     id: 18,
    src: "/p193.jpeg",
    srcSet:"/p193.jpeg",
    alt: "Savannah Print Cotton Dress",
     href: "/product/19"
  },
  {
    id: 19,
    src: "/p201.jpeg",
    srcSet:"/p201.jpeg",
    alt: "Savannah Print Chiffon Pants",
    href: "/product/20"
  }
];