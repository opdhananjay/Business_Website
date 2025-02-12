import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  ngAfterViewInit() {
    this.showMenu('nav-toggle', 'nav-menu');
    this.setupDropdown();
  }

  showMenu(toggleId: string, navId: string) {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        toggle.classList.toggle('show-icon');
      });
    }
  }

  setupDropdown() {
    const dropdownItems = document.querySelectorAll('.dropdown__item');

    dropdownItems.forEach((item) => {
      const dropdownButton = item.querySelector('.dropdown__button');

      dropdownButton?.addEventListener('click', () => {
        const showDropdown = document.querySelector('.show-dropdown');

        this.toggleItem(item as HTMLElement);

        if (showDropdown && showDropdown !== item) {
          this.toggleItem(showDropdown as HTMLElement);
        }
      });
    });
  }

  toggleItem(item: HTMLElement) {
    const dropdownContainer = item.querySelector('.dropdown__container') as HTMLElement;

    if (item.classList.contains('show-dropdown')) {
      dropdownContainer?.removeAttribute('style');
      item.classList.remove('show-dropdown');
    } else {
      dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px';
      item.classList.add('show-dropdown');
    }
  }

  @HostListener('window:resize', ['$event'])
  removeDropdownStyles() {
    const mediaQuery = window.matchMedia('(min-width: 1118px)');

    if (mediaQuery.matches) {
      document.querySelectorAll('.dropdown__container').forEach((e) => {
        e.removeAttribute('style');
      });

      document.querySelectorAll('.dropdown__item').forEach((e) => {
        e.classList.remove('show-dropdown');
      });
    }
  }
  
}
