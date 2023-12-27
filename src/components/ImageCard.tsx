'use client'
import { formatBytes } from "@/utils/formats";

interface ImageCardProps {
    name?: string;
    size?: number;
    uploadDate?: string;
    src?: string;
    extension?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ name, size, uploadDate, src, extension}: ImageCardProps) => {
    function download() {
        window.open(src, '_blank');
    }

    return (
        <div className="card relative bg-white rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img onClick={download}  src={src} className="h-56 w-full object-cover rounded-t-md" alt=""/>
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{name}</h5>
                <p className="text-gray-600">{extension}</p>
                <p className="text-gray-600">{formatBytes(size)}</p>
                <p className="text-gray-600">{uploadDate}</p>
            </div>
        </div>
    )
}