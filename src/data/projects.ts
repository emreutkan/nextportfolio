interface Project {
    id: number;
    title: string;
    shortDescription: string;
    readme: string;
    technologies: string[];
    githubLink: string;
    deploymentUrl?: string;
    images: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "Jukebox",
        shortDescription: "Interactive toolkit for Wi-Fi network attacks and analyses",
        readme: `
      <h1>Jukebox</h1>
      <p>Interactive toolkit designed for Wi-Fi network attacks and analyses. Jukebox automates tasks such as network scanning, device deauthentication, packet capturing, and the cracking of WPA/WPA2 security protocols through minimal user input. It employs a menu that guides the user through selecting options and executing attacks.</p>
      
      <h2>Features</h2>
      <ul>
        <li>Interface Management</li>
        <li>MAC Address Spoofing</li>
        <li>Network Scanning and Target Selection</li>
        <li>Deauthentication Attacks</li>
        <li>Packet Capture</li>
        <li>Handshake Capture</li>
        <li>WPA Key Cracking</li>
      </ul>

      <h3>Prerequisites</h3>
      <ul>
        <li>Python 3</li>
        <li>Linux environment</li>
      </ul>

      <h3>Installation</h3>
      <p>Current installer supports Debian/Arch based distros, for others you have to do it manually.</p>
    `,
        technologies: ["Python", "Shell", "Cybersecurity", "Wireless Attacks", "Network Security"],
        githubLink: "https://github.com/emreutkan/jukebox",
        deploymentUrl: "https://github.com/emreutkan/jukebox/releases/tag/v2.0.0",
        images: [
            "/images/jukebox/network.png",
            "/images/jukebox/menu.png",
            "/images/jukebox/scanning.png"
        ]
    },
];

export default projects;