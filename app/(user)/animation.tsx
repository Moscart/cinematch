import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      stagger: 0.2,
    });
  }

  // const whiteBanner = document.getElementById("white-banner");
  // const blackBanner = document.getElementById("black-banner");

  // if (whiteBanner && blackBanner) {
  //   const tl = gsap.timeline();

  //   tl.set([whiteBanner], {
  //     y: "0vh",
  //   })
  //     .set([blackBanner], {
  //       y: "0vh",
  //     })
  //     .to([whiteBanner], {
  //       y: "-200vh",
  //       duration: 0.75,
  //     })
  //     .to([blackBanner], {
  //       y: "200vh",
  //       duration: 0.5,
  //     })
  //     .to([whiteBanner], {
  //       y: "-300vh",
  //     })
  //     .to([blackBanner], {
  //       opacity: 0,
  //     })
  //     .to([blackBanner], {
  //       y: "300vh",
  //     });
  // }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");
  const bannerThree = document.getElementById("banner-3");
  const bannerFour = document.getElementById("banner-4");

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      stagger: 0.2,
      onComplete: () => {
        router.push(href);
      },
    });
  }
};
