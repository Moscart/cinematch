import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const hiddenBackground = document.getElementById("hidden-background");
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");

  if (hiddenBackground && bannerOne && bannerTwo) {
    const tl = gsap.timeline();

    tl.set([hiddenBackground], {
      opacity: 1,
      display: "block",
    })
      .to([bannerOne], {
        xPercent: 50,
        duration: 2,
        ease: "power4.in",
      })
      .to(
        [bannerTwo],
        {
          xPercent: -100,
          duration: 2,
          ease: "power4.in",
        },
        "<"
      )
      .to([hiddenBackground], {
        opacity: 0,
        duration: 1,
        ease: "power4.in",
      })
      .to([hiddenBackground], {
        display: "none",
      });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const hiddenBackground = document.getElementById("hidden-background");
  const bannerOne = document.getElementById("banner-1");
  const bannerTwo = document.getElementById("banner-2");

  if (hiddenBackground && bannerOne && bannerTwo) {
    const tl = gsap.timeline();

    tl.set([hiddenBackground], {
      opacity: 0,
      display: "none",
    })
      .set([bannerOne], {
        xPercent: -100,
      })
      .set([bannerTwo], {
        xPercent: 50,
      })
      .to([hiddenBackground], {
        display: "block",
      })
      .to([hiddenBackground], {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      })
      .to([bannerOne], {
        xPercent: 0,
        duration: 3,
        ease: "power4.out",
      })
      .to(
        [bannerTwo],
        {
          xPercent: -50,
          duration: 3,
          ease: "power4.out",
          onComplete: () => {
            router.push(href);
          },
        },
        "<"
      );
  }
};
