const dateFormatter = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" });

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso));
