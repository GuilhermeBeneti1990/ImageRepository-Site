'use client'

import { Template, ImageCard, Button, InputText, AuthenticatedPage } from "@/components"
import { useNotification } from "@/hooks";
import { useState } from "react";
import { useImageService } from "@/resources";
import { Image } from "@/resources/image/image.resource";
import Link from "next/link";

export default function GalleryPage() {
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>("");
    const [extension, setExtension] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const service = useImageService();
    const notification = useNotification();

    async function searchImages() {
        setLoading(true);
        const result = await service.listImages(query, extension);
        setImages(result);
        setLoading(false);

        if(!result.length) {
            notification.notify("No results found", "warning");
        }
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard 
                key={image.url}
                name={image.name} 
                size={image.size} 
                uploadDate={image.uploadDate} 
                src={image.url} 
                extension={image.extension}/>
        )
    }

    function renderImageCards() {
        return images.map(renderImageCard);
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <div className="flex space-x-4">
                        <InputText onChange={event => setQuery(event.target.value)} placeholder="Search for name ou tags" />
                        <select onChange={event => setExtension(event.target.value)} className="border px-4 py-2 rounded-lg text-gray-900">
                            <option value="">All format</option>
                            <option value="PNG">PNG</option>
                            <option value="JPEG">JPEG</option>
                            <option value="GIF">GIF</option>
                        </select>
                        <Button style="bg-blue-500 hover:bg-blue-300" label="Search" onClick={searchImages} />
                        <Link href={"/form"}>
                            <Button style="bg-yellow-500 hover:bg-yellow-300" label="Add +" />
                        </Link>
                    </div>
                </section>
                <section className="grid grid-cols-3 gap-8">
                    {renderImageCards()}
                </section>
            </Template>
        </AuthenticatedPage>
    )
}