import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit, OnDestroy {
  windowHeight = signal<number>(0);
  private resizeTimeout: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.updateWindowSize.bind(this));
      this.updateWindowSize();
      this.initPinElements();
      this.initAnimateHeader();
      this.initAnimateDescriptionList();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.updateWindowSize.bind(this));
    }
    ScrollTrigger.killAll();
  }

  updateWindowSize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.windowHeight.set(window.innerHeight);
      ScrollTrigger.refresh();
    }, 200);
  }
  // For each paragraph, target abd background colour the content-table
  initPinElements() {
    gsap.to('.main-header', {
      scrollTrigger: {
        trigger: '.main-header',
        start: `bottom+=${Number(this.windowHeight) / 2}px center`,
        end: `bottom+=1700px center`,
        toggleActions: 'restart none none none',
        pin: true,
        pinSpacing: false,
        scrub: 1,
        // markers: true,
      },
    });
    gsap.to('.main-description-list', {
      scrollTrigger: {
        trigger: '.main-description-list',
        start: `top top+=100px`,
        end: `top+=1700px center`,
        toggleActions: 'restart none none none',
        pin: true,
        pinSpacing: false,
        scrub: 1,
        // markers: true,
      },
    });
  }

  initAnimateHeader() {
    gsap.fromTo(
      '.main-header',
      { height: '105px' },
      {
        height: '70px',
        duration: 2,
        scrollTrigger: {
          trigger: '.main-header',
          start: 'bottom+=10% top+=120px',
          end: 'bottom+=150% top+=120px',
          toggleActions: 'restart none none none',
          scrub: 1,
          // markers: true,
        },
      }
    );
    gsap.fromTo(
      '.main-header-title',
      { fontSize: '52px' },
      {
        fontSize: '28px',
        duration: 2,
        scrollTrigger: {
          trigger: '.main-header',
          start: 'bottom+=10% top+=120px',
          end: 'bottom+=150% top+=120px',
          toggleActions: 'restart none none none',
          scrub: 1,
          // markers: true,
        },
      }
    );
    gsap.fromTo(
      '.main-header-caption',
      { fontSize: '18px' },
      {
        fontSize: '12px',
        duration: 2,
        scrollTrigger: {
          trigger: '.main-header',
          start: 'bottom+=10% top+=120px',
          end: 'bottom+=150% top+=120px',
          toggleActions: 'restart none none none',
          scrub: 1,
          // markers: true,
        },
      }
    );
  }

  initAnimateDescriptionList() {
    ScrollTrigger.create({
      trigger: '.main-description-content',
      start: 'top center-=50px',
      end: 'top+=280px center-=50px',
      toggleActions: 'restart none none none',
      scrub: 1,
      // markers: true,
      onEnter: () => {
        gsap.to('.organise-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeave: () => {
        gsap.to('.organise-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
      onEnterBack: () => {
        gsap.to('.organise-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeaveBack: () => {
        gsap.to('.organise-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
    });
    ScrollTrigger.create({
      trigger: '.main-description-content',
      start: 'top+=280px center-=50px',
      end: 'top+=560px center-=50px',
      toggleActions: 'restart none none none',
      scrub: 1,
      // markers: true,
      onEnter: () => {
        gsap.to('.share-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeave: () => {
        gsap.to('.share-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
      onEnterBack: () => {
        gsap.to('.share-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeaveBack: () => {
        gsap.to('.share-notes', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
    });
    ScrollTrigger.create({
      trigger: '.main-description-content',
      start: 'top+=560px center-=50px',
      end: 'top+=860px center-=50px',
      toggleActions: 'restart none none none',
      scrub: 1,
      // markers: true,
      onEnter: () => {
        gsap.to('.note-tagging', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeave: () => {
        gsap.to('.note-tagging', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
      onEnterBack: () => {
        gsap.to('.note-tagging', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeaveBack: () => {
        gsap.to('.note-tagging', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
    });
    ScrollTrigger.create({
      trigger: '.main-description-content',
      start: 'top+=860 center-=50px',
      end: 'top+=1200px center-=50px',
      toggleActions: 'restart none none none',
      scrub: 1,
      // markers: true,
      onEnter: () => {
        gsap.to('.spotify-statistics', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeave: () => {
        gsap.to('.spotify-statistics', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
      onEnterBack: () => {
        gsap.to('.spotify-statistics', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: '#dfd3c3',
        });
      },
      onLeaveBack: () => {
        gsap.to('.spotify-statistics', {
          marginRight: '48px',
          marginLeft: '4px',
          backgroundColor: 'transparent',
          clearProps: 'backgroundColor, marginRight, marginLeft',
        });
      },
    });
    console.log('Clicked!');
  }

  handleOrganiseNotesClick() {
    window.scrollTo({
      top: 30,
      behavior: 'smooth',
    });
    console.log('Clicked!');
  }

  handleShareNotesClick() {
    window.scrollTo({
      top: 310,
      behavior: 'smooth',
    });
    console.log('Clicked!');
  }

  handleNoteTaggingClick() {
    window.scrollTo({
      top: 590,
      behavior: 'smooth',
    });
    console.log('Clicked!');
  }

  handleSpotifyStatisticsClick() {
    window.scrollTo({
      top: 895,
      behavior: 'smooth',
    });
    console.log('Clicked!');
  }

  beginOrganising() {
    //
  }
  startSharing() {
    //
  }
  addTags() {
    //
  }
  navigateToStatify() {
    this.router.navigate(['/statify']);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('spotifyLoggedIn', 'false');
    }
  }

  // selectedUser = signal<String>('');
  // userPath = computed(() => {
  //   ('');
  // });
}
