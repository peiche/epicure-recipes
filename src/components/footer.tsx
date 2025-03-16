import React from "react"
import { Typography } from "@progress/kendo-react-common";
import Link from "next/link";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <hr className="k-hr" style={{ borderColor: 'var(--kendo-color-border-alt)' }} />
                <Typography.p className="k-text-center">
                    Written by{` `}
                    <Link className="k-button-link !k-text-underline" href='https://eichefam.net' target="_blank">Paul Eiche</Link>{` `}
                    with recipes from Epicure.{` `}
                    Built with{` `}
                    <Link className="k-button-link !k-text-underline" href='https://nextjs.org/' target="_blank">Next.js</Link>{` `}
                    and hosted on{` `}
                    <Link className="k-button-link !k-text-underline" href='https://www.netlify.com/' target="_blank">Netlify</Link>.
                </Typography.p>
                <Typography.p className="k-text-center">
                    <a className="k-link" href='https://github.com/peiche/epicure-recipes' target="_blank">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                    </a>
                </Typography.p>
            </div>
        </footer>
    )
}