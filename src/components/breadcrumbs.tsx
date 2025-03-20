import Link from "next/link";
import { ReactNode } from "react";

interface BreadcrumbItem {
    href?: string;
    text: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    delimiter?: ReactNode;
}

export default function Breadcrumb({ items, delimiter = '/' }: BreadcrumbProps) {
    return (
        <div className="k-mb-md">
            <nav className="k-breadcrumb k-breadcrumb-wrap k-breadcrumb-md" dir="ltr">
                <ol tabIndex={0} className="k-breadcrumb-root-item-container" dir="ltr">
                    {items.map((item, index) => (
                        <li key={index} className="k-breadcrumb-item">
                            {index > 0 && (
                                <span className="k-icon k-svg-icon k-svg-i-chevron-right k-icon-xs k-breadcrumb-delimiter-icon" aria-hidden="true">
                                    {delimiter}
                                </span>
                            )}
                            {item.href ? (
                                <Link href={item.href} aria-current="false" role="link" id="products" tabIndex={-1} className="k-button-link" dir="ltr">{item.text}</Link>
                            ) : (
                                <span dir="ltr">{item.text}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    )
}