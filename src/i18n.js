import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                "tasks-text": "Tasks",
                "settings-text": "Settings",
                "close-text": "Close",
                "language-text": "Language",
                "addnewtask-text":"Add New Task",
                "search-text":"Search..",
                "collapse-text":"Collapse All",
                "expand-text":"Expand All",
                "delete-text1":"Delete Finished",
                "delete-text2":"Tasks",
                "taskmanagementpanel-text":"Task Management Panel",
                "alltasks-text":"All Tasks",
                "activetasks-text":"Active Tasks",
                "donetasks-text":"Finished Tasks",
                "selectall-text":"Select All",
                "addnewtaskdescription-text":"Task Description..",
                "add-text":"ADD",
                "sign-in":"Sign In",
                "sign-out":"Sign Out"

            }
        },
        tr: {
            translations: {
                "tasks-text": "Görevler",
                "settings-text": "Ayarlar",
                "close-text": "Kapat",
                "language-text": "Dil",
                "addnewtask-text":"Yeni Görev Ekle",
                "search-text":"Arama...",
                "collapse-text":"Hepsini Gizle",
                "expand-text":"Hepsini Aç",
                "delete-text2":"Sil",
                "delete-text1":"Biten Görevleri",
                "taskmanagementpanel-text":"Görev Yönetim Paneli",
                "alltasks-text":"Tüm Görevler",
                "activetasks-text":"Aktif Görevler",
                "donetasks-text":"Biten Görevler",
                "selectall-text":"Hepsini Seç",
                "addnewtaskdescription-text":"Görev Tanımı..",
                "add-text":"EKLE",
                "sign-in":"Giriş",
                "sign-out":"Çıkış"

            }
        },   
        de: {
            translations: {
                "tasks-text": "Aufgaben",
                "settings-text": "Einstellungen",
                "close-text": "Verlassen",
                "language-text": "Sprache",
                "addnewtask-text":"Neue Aufgabe Hinzufügen",
                "search-text":"Suche...",
                "collapse-text":"Alles zusammenbrechen",
                "expand-text":"Alle Erweitern",
                "delete-text1":"Erledigte",
                "delete-text2":"Aufgaben Löschen",
                "taskmanagementpanel-text":"Aufgabenverwaltungsbereich",
                "alltasks-text":"Alle Aufgaben",
                "activetasks-text":"Aktive Aufgaben",
                "donetasks-text":"Erledigte Aufgaben",
                "selectall-text":"Wählen Sie Alle",
                "addnewtaskdescription-text":"Aufgabenbeschreibung..",
                "add-text":"Hinzufügen",
                "sign-in":"Einloggen",
                "sign-out":"Ausloggen"

            }
        },
    },
    fallbackLng: "en",
    debug: true,
  
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
  
    keySeparator: false, // we use content as keys
  
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ","
    },
  
    react: {
      wait: true
    }
  });
  
  export default i18n;