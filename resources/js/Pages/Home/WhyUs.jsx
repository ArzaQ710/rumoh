
function Card({ icon, title, description }) {
    return (
        <div className="flex-1 hover:shadow-lg p-4 rounded-3xl my-2 md:mx-2 cursor-default card">
            {/* <img src={icon} alt="title" /> */}
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p>{description}</p>
        </div>
    );
}

const advantages = [
    {
        icon: "",
        title: "Temukan rumah impian anda",
        description:
            "Hanya dengan sentuhan jari anda akan dengan mudah menemukan rumah impian anda.",
    },
    {
        icon: "",
        title: "Temukan tempat untuk bisnis anda",
        description: "Lebih cepat dalam mencari ruko untuk bisnis anda.",
    },
    {
        icon: "",
        title: "Akses semudah dan senyaman yang anda harapkan.",
        description:
            "Tidak perlu repot kesana-kemari. Hanya dengan sentuhan jari, temukan properti sesuai keinginan anda.",
    },
];

const WhyUs = () => {
    return (
        <div
            id="why-us"
            className="container xl mx-auto px-4 md:px-6 lg:px-16 py-16"
        >
            <div>
                <h2
                    className={"text-center font-bold text-2xl"}
                    style={{ color: "rgb(45 170 195)" }}
                >
                    Mengapa memilih Rumoh.id
                </h2>
            </div>
            <div className="card-container flex flex-col md:flex-row items-center md:items-start md:justify-between mt-5">
                <p className="px-4 md:px-6 text-center font-semibold leading-7">
                    Kami akan bekerja dengan Anda secara individual untuk
                    memastikan bahwa kami memberikan solusi terbaik untuk
                    kebutuhan properti Anda. Apakah itu menjual rumah Anda
                    dengan cepat, membeli properti yang telah direnovasi atau
                    menyewa rumah baru. Tim ahli kami berdedikasi untuk
                    memastikan bahwa kami memberikan situasi yang saling
                    menguntungkan bagi semua klien kami.
                </p>
            </div>
        </div>
    );
};

export default WhyUs;
