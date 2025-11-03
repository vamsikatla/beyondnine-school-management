import * as React from "react";
import { Modal, ModalFooter } from "./Modal";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { 
  Upload, 
  X, 
  File, 
  Image, 
  Video, 
  FileText,
  Download,
  Eye,
  Trash2,
  Plus,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Check,
  AlertCircle,
  Loader2,
  Folder,
  Search,
  Filter,
  Grid,
  List,
  Share2,
  Copy,
  Edit,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// File Upload Modal with drag and drop
interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void | Promise<void>;
  title: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  maxFiles?: number;
  allowMultiple?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
  existingFiles?: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    url?: string;
    uploadedAt?: Date;
  }>;
  onRemoveExisting?: (fileId: string) => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  title,
  acceptedFileTypes = [],
  maxFileSize = 10,
  maxFiles = 5,
  allowMultiple = true,
  isUploading = false,
  uploadProgress = 0,
  existingFiles = [],
  onRemoveExisting
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
      return `File "${file.name}" is too large. Maximum size is ${maxFileSize}MB.`;
    }
    
    if (acceptedFileTypes.length > 0) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type;
      
      if (!acceptedFileTypes.some(type => 
        type === fileExtension || type === mimeType || 
        (type.startsWith('.') && fileExtension === type) ||
        (type.includes('/') && mimeType.startsWith(type.split('/')[0]))
      )) {
        return `File "${file.name}" is not an accepted file type.`;
      }
    }
    
    return null;
  };

  const handleFiles = (files: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];
    
    const totalFiles = selectedFiles.length + existingFiles.length + files.length;
    if (totalFiles > maxFiles) {
      newErrors.push(`Cannot upload more than ${maxFiles} files total.`);
      return;
    }
    
    files.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });
    
    setErrors(newErrors);
    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string, fileType?: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const type = fileType || '';
    
    if (type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension || '')) {
      return <Image className="h-8 w-8 text-blue-500" />;
    } else if (type.startsWith('video/') || ['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(extension || '')) {
      return <Video className="h-8 w-8 text-purple-500" />;
    } else if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension || '')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else {
      return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      onUpload(selectedFiles);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      preventClose={isUploading}
    >
      <div className="space-y-6">
        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
            isUploading && "opacity-50 pointer-events-none"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className={cn("h-12 w-12 mx-auto mb-4", dragActive ? "text-primary" : "text-muted-foreground")} />
          
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {dragActive ? "Drop files here" : "Upload files"}
            </p>
            <p className="text-sm text-muted-foreground">
              Drag and drop files here, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:underline font-medium"
              >
                browse
              </button>
            </p>
            
            <div className="text-xs text-muted-foreground space-y-1">
              {acceptedFileTypes.length > 0 && (
                <p>Accepted: {acceptedFileTypes.join(', ')}</p>
              )}
              <p>Max file size: {maxFileSize}MB | Max files: {maxFiles}</p>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple={allowMultiple}
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Selected Files ({selectedFiles.length})</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  {getFileIcon(file.name, file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="p-1 h-auto"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Existing Files */}
        {existingFiles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Existing Files ({existingFiles.length})</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {existingFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/50 rounded-lg">
                  {getFileIcon(file.name, file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.uploadedAt && (
                        <span>• Uploaded {file.uploadedAt.toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {file.url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(file.url, '_blank')}
                        className="p-1 h-auto"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {onRemoveExisting && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveExisting(file.id)}
                        className="p-1 h-auto text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={isUploading}>
          Cancel
        </Button>
        <Button 
          onClick={handleUpload} 
          disabled={selectedFiles.length === 0 || isUploading}
          loading={isUploading}
        >
          {isUploading ? `Uploading... (${Math.round(uploadProgress)}%)` : `Upload ${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''}`}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Image Gallery Modal
interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{
    id: string;
    src: string;
    thumbnail?: string;
    title?: string;
    description?: string;
    uploadedBy?: string;
    uploadedAt?: Date;
    size?: number;
  }>;
  initialImageIndex?: number;
  onDelete?: (imageId: string) => void;
  onDownload?: (imageId: string) => void;
  onShare?: (imageId: string) => void;
}

export const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  initialImageIndex = 0,
  onDelete,
  onDownload,
  onShare
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(initialImageIndex);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const currentImage = images[currentImageIndex];

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
    setZoomLevel(1);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
    } else {
      setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
    }
    setZoomLevel(1);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isViewerOpen && currentImage) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title=""
        size="full"
        showCloseButton={false}
        overlayVariant="dark"
        className="bg-black"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Image */}
          <div className="relative max-w-full max-h-full overflow-auto">
            <img
              src={currentImage.src}
              alt={currentImage.title || `Image ${currentImageIndex + 1}`}
              style={{ 
                transform: `scale(${zoomLevel})`,
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
              className="transition-transform duration-200"
            />
          </div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleZoom(-0.25)}
              className="text-white hover:bg-white/20"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <span className="text-white text-sm px-2">
              {Math.round(zoomLevel * 100)}%
            </span>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleZoom(0.25)}
              className="text-white hover:bg-white/20"
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setZoomLevel(1)}
              className="text-white hover:bg-white/20"
            >
              <Maximize className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsViewerOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Info */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  {currentImage.title || `Image ${currentImageIndex + 1} of ${images.length}`}
                </h3>
                {currentImage.description && (
                  <p className="text-sm text-white/80 mt-1">{currentImage.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-white/60 mt-2">
                  {currentImage.uploadedBy && <span>By {currentImage.uploadedBy}</span>}
                  {currentImage.uploadedAt && <span>{currentImage.uploadedAt.toLocaleDateString()}</span>}
                  {currentImage.size && <span>{formatFileSize(currentImage.size)}</span>}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {onDownload && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDownload(currentImage.id)}
                    className="text-white hover:bg-white/20"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                )}
                
                {onShare && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShare(currentImage.id)}
                    className="text-white hover:bg-white/20"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                )}
                
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(currentImage.id)}
                    className="text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Image Gallery"
      size="2xl"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {images.length} image{images.length !== 1 ? 's' : ''}
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Images */}
        {images.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No images found</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary"
                onClick={() => openImageViewer(index)}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.title || `Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-medium truncate">
                      {image.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => openImageViewer(index)}
              >
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={image.thumbnail || image.src}
                    alt={image.title || `Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">
                    {image.title || `Image ${index + 1}`}
                  </h4>
                  {image.description && (
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {image.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    {image.uploadedBy && <span>By {image.uploadedBy}</span>}
                    {image.uploadedAt && <span>• {image.uploadedAt.toLocaleDateString()}</span>}
                    {image.size && <span>• {formatFileSize(image.size)}</span>}
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={(e) => {
                    e.stopPropagation();
                    openImageViewer(index);
                  }}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {onDownload && (
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onDownload(image.id);
                    }}>
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  
                  {onDelete && (
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onDelete(image.id);
                    }} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ModalFooter>
        <Button variant="default" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};