import Breadcrumb from "./components/Breadcrumb";
import CollectorsSection from "./components/CollectorsSection";
import PhotoArea from "./components/PhotoArea";
import PhotoMetaBar from "./components/PhotoMetaBar";
import VariantHeader from "./components/VariantHeader";

export default function VariantPage() {
  return (
    <div className="max-w-[900px] mx-auto">
      <Breadcrumb />
      <PhotoArea />
      <PhotoMetaBar />
      <VariantHeader />
      <CollectorsSection />
    </div>
  );
}
