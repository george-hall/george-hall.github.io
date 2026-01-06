// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "in reverse chronological order.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "dropdown-postdoctoral",
              title: "postdoctoral",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "";
              },
            },{id: "dropdown-doctoral",
              title: "doctoral",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "";
              },
            },{id: "dropdown-predoctoral",
              title: "predoctoral",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "";
              },
            },{id: "nav-software",
          title: "software",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/software/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-running-ray-tune-on-sun-grid-engine",
      
        title: "Running Ray Tune on Sun Grid Engine",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2026/ray-tune-sge/";
        
      },
    },{id: "post-how-to-check-whether-two-directories-are-identical",
      
        title: "How to check whether two directories are identical",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/verifying-whether-two-directories-identical/";
        
      },
    },{id: "post-my-configuration-files",
      
        title: "My configuration files",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/command-line-configuration-files/";
        
      },
    },{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-doctoral",
          title: 'doctoral',
          description: "Sept 2017 - Nov 2020",
          section: "Projects",handler: () => {
              window.location.href = "/projects/doctoral/";
            },},{id: "projects-postdoctoral",
          title: 'postdoctoral',
          description: "November 2020 - present",
          section: "Projects",handler: () => {
              window.location.href = "/projects/postdoctoral/";
            },},{id: "projects-predoctoral",
          title: 'predoctoral',
          description: "July 2015 - July 2016",
          section: "Projects",handler: () => {
              window.location.href = "/projects/predoctoral/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%67%65%6F%72%67%65.%68%61%6C%6C@%75%63%6C.%61%63.%75%6B", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/george-t-hall", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=gBlYdZwAAAAJ", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/G_T_Hall", "_blank");
        },
      },{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Socials',
        handler: () => {
          window.open("https://bsky.app/profile/gthall.bsky.social", "_blank");
        },
      },];
