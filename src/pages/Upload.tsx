import { useState, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Button, Container, Row, Col, Card, CardImg, Carousel, CarouselItem, CarouselControl, CarouselIndicators, Spinner } from "reactstrap";
import Swal from "sweetalert2";

const Upload = () => {
  const [images, setImages] = useState<Array<File & { preview: string }>>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
          Swal.fire({
                    title: "Error!",
                    text: "Algunos archivos no son válidos. Solo se permiten imágenes.",
                    icon: "warning"
          });
    }
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prev) => {
      const existingFiles = new Set(prev.map((file) => file.name));
      return [...prev, ...newImages.filter((file) => !existingFiles.has(file.name))];
    });
  };

  useEffect(() => {
    return () => {
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [images]);

  const removeImage = (fileName: string) => {
    setImages((prev) => prev.filter((file) => file.name !== fileName));
  };

  const uploadImages = async () => {
    setLoading(true);
    Swal.fire({
          title: "Success!",
          text: "Subiendo imágenes...",
          icon: "success"
     });
    // Aquí puedes implementar la lógica real de subida a un backend o storage
    setTimeout(() => {
      setLoading(false);
      Swal.fire({
          title: "Success!",
          text: "Imágenes subidas exitosamente!",
          icon: "success"
     });
    }, 2000); // Simulación de tiempo de subida
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: (acceptedFiles, fileRejections) => onDrop(acceptedFiles, fileRejections),
  });

  const next = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToIndex = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  return (
    <Container className="mt-4">
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>Arrastra y suelta imágenes aquí, o haz clic para seleccionarlas</p>
      </div>

      {/* Carrusel para mostrar las imágenes cargadas */}
      {images.length > 0 && (
        <div style={{ width: "65%", margin: "10px auto" }}>
          <Carousel activeIndex={activeIndex} next={next} previous={prev}>
            <CarouselIndicators
              items={images.map((_, index) => ({ key: index, active: index === activeIndex }))}
              activeIndex={activeIndex}
              onClickHandler={goToIndex}
            />
            {images.map((file) => (
              <CarouselItem key={file.name}>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={file.preview}
                    alt="preview"
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                </Card>
              </CarouselItem>
            ))}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={prev} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
          </Carousel>
        </div>
      )}

      {/* Vista previa de las imágenes como miniaturas */}
      <Row className="mt-3">
        {images.map((file) => (
          <Col md={3} key={file.name} className="mb-3">
            <Card>
              <CardImg
                top
                width="100%"
                src={file.preview}
                alt="preview"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Button color="danger" size="sm" onClick={() => removeImage(file.name)}>
                Eliminar
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {images.length > 0 && (
        <Button color="primary" onClick={uploadImages} disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Subir imágenes"}
        </Button>
      )}
    </Container>
  );
};

export default Upload;
