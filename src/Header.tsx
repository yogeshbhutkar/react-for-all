import { Link } from "raviger";
import logo from "./logo.svg";

export default function Header() {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={logo}
        className="animate-spin h-16 w-16"
        alt="logo"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
        ].map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className="text-white font-semibold p-2 m-2 uppercase"
          >
            {link.page}
          </Link>
        ))}
      </div>
    </div>
  );
}
