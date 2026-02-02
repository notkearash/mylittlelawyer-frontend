import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center gap-2 font-sans">
      <div className="flex gap-2">
        <Button variant={"default"}>Primary</Button>
        <Button variant={"secondary"}>Secondary</Button>
        <Button className="bg-accent">Accent</Button>
      </div>
    </main>
  );
}
