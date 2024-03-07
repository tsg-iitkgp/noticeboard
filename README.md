<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links-->
<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

</div>

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Technology Noticeboard</h3>

  <p align="center">
  <!-- UPDATE -->
    <i>Official updates regarding tech facilities of IIT Kharagpur</i>
    <br />
    <a href="https://github.com/tsg-iitkgp/noticeboard/issues">Report Bug</a>
    ·
    <a href="https://github.com/tsg-iitkgp/noticeboard/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
<summary>Table of Contents</summary>

- [About The Project](#about-the-project)
- [Serving The Static Site](#serving-the-static-site)
- [Creating Notices](#creating-notices)
    - [Syncing With Server](#syncing-with-server)
- [Contact](#contact)
    - [Present Technology Coordinator(s)](#present-technology-coordinators)
- [Additional Documentation](#additional-documentation)

</details>


<!-- ABOUT THE PROJECT -->
## About the project
<!-- UPDATE -->
<div align="center">
  <a href="https://github.com/tsg-iitkgp/noticeboard">
    <img width="80%" alt="image" src="https://github.com/tsg-iitkgp/noticeboard/assets/86282911/1406d02e-45d6-4151-9992-728eec82e4d4">
  </a>
</div>

This noticeboard displays important announcements about IIT Kharagpur's technical facilities and related events. It serves as a central location for the campus community to find up-to-date information on things like network downtime, maintenance schedules, ERP issues, general guidelines related to tech in IIT KGP and more.

<p align="right">(<a href="#top">back to top</a>)</p>

## Serving the static site

Use any webserver to host the files in this repository. Following are the quite popular ones:
- [nginx](https://jvns.ca/blog/2022/01/24/hosting-my-static-sites-with-nginx/)
- [apache](https://github.com/KBNLresearch/nl-menu-resources/blob/master/doc/serving-static-website-with-Apache.md)
- [python http server](https://nicolas-dmg.medium.com/serve-static-files-through-http-s-with-python-3-3ba4b6c5f57e)

> [!Note]
> We use [nginx](https://www.nginx.com/) in the docker container.<br>
> Configuration file for nginx: [nginx.conf](./nginx.conf).

1. Update details of __Present Technology Coordinator(s)__. 
    - Save pictures in `./assets` with roll number as the file name. For example:
      ```env
      21IM10009.png
      ```
    - Update `techcoordi.json`. It has the following structure
      ```json
      [
        {
          "id": "21IM10009",
          "name": "Arpit Bhardwaj",
          "email": "arpitbhardwaj.iitkgp@gmail.com",
          "tele": "9761667733",
          "linkedin": "https://linkedin.com/in/proffapt"
        }
      ]
      ```
2. Run the docker container
    ```sh
    sudo docker-compose up -d
    ```
3. Visit `http://localhost:8001/`

> [!Note]
> Alternatively you can run `python3 -m http.server 8001` to serve the files instead of docker or nginx

<p align="right">(<a href="#top">back to top</a>)</p>

## Creating notices

Make sure you have `python` installed. Once that is verified, follow the steps below:

1. Run the `create-notice.py` script
    ```sh
    cd scripts/
    python3 create-notice.py
    ```
2. Enter the title in the prompt
3. **Type** or **Paste** the notice
4. Press `Enter` to go to the new line
5. Press `Ctrl+D` to complete the notice

#### Syncing with server

1. Move to `./scripts/` directory
2. Configure the environment variables. 
    - Copy `.env.example` as `.env`
    - Fill the following self-explanatory template
      ```env
      SERVER_USERNAME=pi
      SERVER_IP=192.168.17.69
      SERVER_DIR=/home/pi/noticeboard/notices
      SERVER_PASSWORD=mysecretpassword 
      # Leave SERVER_PASSWORD empty if SSH through SSH keys is configured
      ```
3. Run the `create-notice.py` script with `--sync` argument
    ```sh
    python3 create-notice.py --sync
    ```
4. Follow steps 2-5 of [Creating Notices](#creating-notices)

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

<p>
📫 Technology Students' Gymkhana -
<a href="https://www.facebook.com/TSG.IITKharagpur">
  <img align="center" alt="TSG's Facebook" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/facebook.svg" />
</a>
<a href="https://instagram.com/tsg.iitkharagpur/">
  <img align="center" alt="TSG's Instagram" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/instagram.svg" />
</a>
<a href="https://twitter.com/Gymkhana_IITKGP/">
  <img align="center" alt="TSG's Twitter " width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/twitter.svg" />
</a>
<a href="https://www.linkedin.com/company/technology-students-gymkhana-iit-kharagpur/">
  <img align="center" alt="TSG's LinkedIn" width="22px" src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/linkedin.svg" />
</a>
<a href="https://tsgblog.iitkgp.ac.in">
  <img align="center" alt="TSG's Blog" width="22px" src="https://github.com/tsg-iitkgp/README.md/assets/86282911/33d6d84f-34ce-4a89-bd89-585dbf39e304" />
</a>
</p>

#### Present Technology Coordinator(s)

> [!Note]
> For any ideas, suggestions or queries regarding this project, mail us at <tech.coordi@iitkgp.ac.in>

Name|Email|Phone No.
-----|-----|---------
[Arpit Bhardwaj](https://linktr.ee/proffapt) | <arpitbhardwaj.iitkgp@gmail.com> | +91-9761667733
[Parth Gupta](https://github.com/ParthGupta2510) | <guptaparth.iitkgp@gmail.com> | +91-7620821543

<p align="right">(<a href="#top">back to top</a>)</p>

## Additional Documentation

  - [License](/LICENSE)
  - [Code of Conduct](/.github/CODE_OF_CONDUCT.md)
  - [Security Policy](/.github/SECURITY.md)
  - [Contribution Guidelines](/.github/CONTRIBUTING.md)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/tsg-iitkgp/noticeboard.svg?style=for-the-badge
[contributors-url]: https://github.com/tsg-iitkgp/noticeboard/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tsg-iitkgp/noticeboard.svg?style=for-the-badge
[forks-url]: https://github.com/tsg-iitkgp/noticeboard/network/members
[stars-shield]: https://img.shields.io/github/stars/tsg-iitkgp/noticeboard.svg?style=for-the-badge
[stars-url]: https://github.com/tsg-iitkgp/noticeboard/stargazers
[issues-shield]: https://img.shields.io/github/issues/tsg-iitkgp/noticeboard.svg?style=for-the-badge
[issues-url]: https://github.com/tsg-iitkgp/noticeboard/issues
[license-shield]: https://img.shields.io/github/license/tsg-iitkgp/noticeboard.svg?style=for-the-badge
[license-url]: https://github.com/tsg-iitkgp/noticeboard/blob/master/LICENSE
