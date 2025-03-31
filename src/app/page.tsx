import {
  Head,
  LatesTraillers,
  Search,
  Trending,
  WhatsPopular,
} from "@/components";

export default function Home() {
  return (
    <div className="max-w-[1600px] mx-auto">
      <Search />
      <Head />
      <Trending />
      <LatesTraillers />
      <WhatsPopular />
    </div>
  );
}