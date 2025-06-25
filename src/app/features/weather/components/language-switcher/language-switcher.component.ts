import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css']
})
export class LanguageSwitcherComponent {
  @Output() languageChanged = new EventEmitter<string>();

  constructor(private translate: TranslateService) {
    const storedLanguage = localStorage.getItem('language') || 'en';
    this.selectedLanguage = storedLanguage;
    this.translate.setDefaultLang(storedLanguage);
    this.translate.use(this.selectedLanguage);
    this.languageChanged.emit(this.selectedLanguage);
  }

  languages = [
    { label: "English", value: "en" },
    { label: "Ukrainian", value: "uk" }
  ];

  selectedLanguage = this.languages[0].label;

  switchLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
    this.languageChanged.emit(language);
  }
}
