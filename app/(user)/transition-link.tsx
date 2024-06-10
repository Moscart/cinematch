import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "./animation";

interface Props {
  href: string;
}

export const TransitionLink = ({ href }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname !== href) {
    animatePageOut(href, router);
  }
};
