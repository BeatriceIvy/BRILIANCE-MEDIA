import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        router.post("/news", data);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if (!props.myNews) {
            router.get("/news");
        }
        return;
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 text-gray-900">
                        {isNotif && (
                            <div role="alert" className="alert alert-success">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{props.flash.message}</span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Judul"
                            className="m-2 input input-bordered w-full bg-transparent"
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Deskripsi"
                            className="m-2 input input-bordered w-full bg-transparent"
                            onChange={(description) =>
                                setDescription(description.target.value)
                            }
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            className="m-2 input input-bordered w-full bg-transparent"
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <button
                            className="btn btn-primary m-2"
                            onClick={() => handleSubmit()}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
                <div className="p-4">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card bg-base-100 w-full lg:w-96 shadow-sm m-2"
                                >
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                        alt="Shoes"
                                    />
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-inline">
                                                {news.category}
                                                <div className="badge badge-outline">
                                                    <Link href={route('edit.news')} method="get" data={{ id: news.id }} as="button">edit</Link>
                                                </div>
                                                <div className="badge badge-outline">
                                                    <Link href={route('delete.news')} method="post" data={{ id: news.id }} as="button">delete</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Anda belum memiliki berita</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
