import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useTranslation } from "react-i18next";

interface PomodoroMenuBarProps {
  onClose: () => void;
  onShowHelp: () => void;
  onShowAbout: () => void;
  onReset: () => void;
}

export function PomodoroMenuBar({
  onClose,
  onShowHelp,
  onShowAbout,
  onReset,
}: PomodoroMenuBarProps) {
  const { t } = useTranslation();

  return (
    <Menubar className="bg-transparent border-none shadow-none px-2 py-1 h-auto">
      <MenubarMenu>
        <MenubarTrigger className="px-2 py-0.5">{t("menu.file")}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={onReset}>{t("menu.new")}</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onClose}>{t("menu.close")}</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="px-2 py-0.5">{t("menu.help")}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={onShowHelp}>
            {t("menu.helpTopics", "Help Topics")}
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={onShowAbout}>
            {t("menu.about", "About Pomodoro")}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

