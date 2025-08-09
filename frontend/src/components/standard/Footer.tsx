interface InfoTextBlock {
    title?: string;
    textLines: FooterLine[];
}

interface FooterLine {
    text: string;
    bold?: boolean;
}

function Footer() {
    const infoTextBlocks: InfoTextBlock[] = [
        {
            title: "Curabitur",
            textLines: [
                { text: "Emauris" },
                { text: "Kfringilla" },
                { text: "Oin magna sem" },
                { text: "Kelementum" }
            ]
        },
        {
            title: "Fusce",
            textLines: [
                { text: "Econsectetur" },
                { text: "Ksollicitudin" },
                { text: "Omvulputate" },
                { text: "Nunc fringilla tellu" },
            ]
        },
        {
            title: "Kontakt",
            textLines: [
                { text: "Peakontor: Tallinnas", bold: true },
                { text: "Väike-Ameerika 1, 11415 Tallinn"},
                { text: "Telefon: 605 4450" },
                { text: "Faks: 605 3186" }
            ]
        },
        {
            textLines: [
                { text: "Harukontor: Võrus", bold: true },
                { text: "Oja tn 7 (külastusaadress)" },
                { text: "Telefon 605 3330" },
                { text: "Faks: 605 3155" }
            ]
        }
    ]

    return (
        <div className="p-10 flex justify-between bg-secondary text-primary-foreground text-left">
            {infoTextBlocks.map((block, i) => (
                <div key={i} className="text-neutral-300">
                    <div className="text-2xl mb-2">
                        {block.title ? (
                            <h1>{block.title}</h1>
                        ) : (
                            <h1 className="invisible">placeholder</h1>
                        )}
                    </div>
                    {block.textLines.map((line, i) => (
                        <div key={i} className={`${line.bold ?? false ? "font-bold" : "text-neutral-400"}`}>
                            <p>{line.text}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Footer;
