import { a as apply, d as directive } from '../common/twind-43b88e2b.js';

var x = e => {
  switch (e) {
    case "%20":
      return " ";

    case "%3D":
      return "=";

    case "%3A":
      return ":";

    case "%2F":
      return "/";

    default:
      return e.toLowerCase();
  }
},
    o = e => "data:image/svg+xml," + encodeURIComponent(e.trim().replace(/\s+/g, " ").replace(/"/g, "'")).replace(/%[\dA-F]{2}/g, x),
    n = ({
  theme: e
}) => ({
  "&::placeholder": {
    opacity: "1",
    color: e("placeholderColor.DEFAULT", e("colors.gray.400", "#a1a1aa"))
  }
}),
    i = ({
  theme: e
}) => ({
  backgroundImage: "initial",
  backgroundPosition: "initial",
  backgroundRepeat: "unset",
  backgroundSize: "initial",
  paddingRight: e("spacing.3"),
  colorAdjust: "unset"
}),
    c = ({
  theme: e
}) => ({
  "background-image": `url("${o(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${e("colors.gray.500")}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`)}")`,
  backgroundPosition: `right ${e("spacing.2")} center`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "1.5em 1.5em",
  paddingRight: e("spacing.10"),
  colorAdjust: "exact"
}),
    r = apply`
  appearance-none bg-white border(& gray-500) rounded-none
  py-2 px-3 text-base
  focus:(outline-none ring(1 blue-600) border-blue-600)
`,
    l = e => ({
  [e + "::-webkit-datetime-edit-fields-wrapper"]: apply`p-0`,
  [e + "::-webkit-date-and-time-value"]: {
    minHeight: "1.5em"
  }
}),
    w = apply(r, n, () => ({ ...l("&"),
  "&[multiple]": i
})),
    k = apply(r, n),
    S = apply(r, c, () => ({
  "&[multiple]": i
})),
    a = () => ({
  "&": apply`
    appearance-none p-0 inline-block align-middle select-none
    flex-shrink-0 h-4 w-4 text-blue-600 bg-white border(& gray-500)
    ${() => ({
    colorAdjust: "exact",
    backgroundOrigin: "border-box"
  })}
  `,
  "&:focus": apply`outline-none ring(2 blue-600) border-gray-500`,
  "&:checked": apply`border-transparent bg(current center no-repeat) ${() => ({
    backgroundSize: "100% 100%"
  })}`,
  "&:checked:hover,&:checked:focus": apply`border-transparent bg-current`
}),
    d = () => ({
  "&": apply`rounded-none`,
  "&:checked": {
    backgroundImage: `url("${o('<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>')}")`
  },
  "&:indeterminate": apply`border-transparent bg(current center no-repeat) ${() => ({
    backgroundImage: `url("${o('<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>')}")`,
    backgroundSize: "100% 100%"
  })}`,
  "&:indeterminate:hover,&:indeterminate:focus": apply`border-transparent bg-current`
}),
    u = () => ({
  "&": apply`rounded-full`,
  "&:checked": {
    backgroundImage: `url("${o('<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>')}")`
  }
}),
    f = apply(a, d),
    y = apply(a, u),
    p = () => ({
  "&": {
    background: "unset",
    borderColor: "inherit",
    borderWidth: "0",
    borderRadius: "0",
    padding: "0",
    fontSize: "unset",
    lineHeight: "inherit"
  },
  "&:focus": {
    outline: ["1px solid ButtonText", "1px auto -webkit-focus-ring-color"]
  }
}),
    C = apply(p),
    g = e => ({
  [`[type="text"],[type="email"],[type="url"],[type="password"],[type="number"],[type="date"],[type="datetime-local"],[type="month"],[type="search"],[type="tel"],[type="time"],[type="week"],[multiple],${e}textarea,${e}select`]: r,
  [`${e}input,${e}textarea`]: n,
  ...l(""),
  [`${e}select`]: c,
  "[multiple]": i,
  '[type="checkbox"],[type="radio"]': a,
  '[type="checkbox"]': d,
  '[type="radio"]': u,
  '[type="file"]': p
}),
    v = directive(() => g(""), void 0);

export { w as formInput, v as forms };
