import { AlphabetGrid } from "@/components/AlphabetGrid";
import { Page, TopBar } from "@/components/Bits";
import { getTifinagh } from "@/content";
import { t } from "@/i18n";
import { isKnown, loadRoomProgress } from "@/lib/progress";

export default async function AlphabetPage() {
  const room = getTifinagh();
  const progress = await loadRoomProgress(room.id);
  const known = room.letters.filter((l) => isKnown(progress.items.get(l.id))).map((l) => l.id);

  return (
    <>
      <TopBar href="/tifinagh" />
      <Page>
        <header>
          <h1 className="title text-[2.75rem] text-ink">{t("alphabet.title")}</h1>
          <p className="text-[1.0625rem] text-ink">{t("alphabet.intro")}</p>
        </header>
        <AlphabetGrid letters={room.letters} known={known} />
      </Page>
    </>
  );
}
