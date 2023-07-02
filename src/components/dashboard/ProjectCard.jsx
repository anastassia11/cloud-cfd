

export default function ProjectCard({ key, item = {} }) {
    return (
        <article className="bg-day-00 border rounded-lg duration-300 hover:shadow-md hover:bg-day-150 cursor-pointer"
            key={key}>
            <a href={item.href}>
                {item.img}
                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                    <span className="block text-day-300 text-sm">{item.date}</span>
                </div>
                <div className="pt-3 ml-4 mr-2 mb-3">
                    <h3 className="text-base text-day-3550 font-medium">
                        {item.title}
                    </h3>
                    <p className="text-day-300 text-sm mt-1">{item.desc}</p>
                </div>
            </a>
        </article>
    )
}
