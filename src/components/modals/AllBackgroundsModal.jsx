import DESIGN_TOKENS from "@/styles/tokens";
import BaseModal from "./BaseModal";
import { Search } from "lucide-react";
import ImageBackgroundItem from "./ImageBackgroundItem";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUnsplashBackgrounds } from "@/features/unsplash/unsplashThunk";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { SyncLoader } from "react-spinners";

const AllBackgroundsModal = ({
  isAllBackgroundsOpen,
  closeAllBackgrounds,
  selectedBackground,
  onReturntoLimitedBackgrounds,
  backgrounds,
  loading,
  onSelect,
}) => {
  const [page, setPage] = useState(1);
  const [internalLoading, setInternalLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchMoreBackgrounds = useCallback(() => {
    if (internalLoading) return;
    setInternalLoading(true);
    const nextPage = page + 1;
    dispatch(fetchUnsplashBackgrounds(nextPage));
    setPage(nextPage);
    setInternalLoading(false);
  }, [dispatch, page, internalLoading]);

  const canLoadMore = !loading && backgrounds.length % 20 === 0;
  const observerRef = useInfiniteScroll(
    fetchMoreBackgrounds,
    canLoadMore,
    internalLoading
  );

  if (!isAllBackgroundsOpen) return null;
  return (
    <>
      <div
        className={`absolute top-1/2 trnsform -translate-y-1/2 right-16 max-h-[calc(100vh-75px)] w-74 z-40 ${DESIGN_TOKENS.colors.overlay} rounded-lg flex flex-col border border-gray-700 py-2 mb-10 mx-auto overflow-y-auto`}
      >
        <BaseModal
          isAllBackgroundsOpen={isAllBackgroundsOpen}
          backBtn={true}
          onReturntoLimited={onReturntoLimitedBackgrounds}
          onClose={closeAllBackgrounds}
          title={
            <>
              Photos by
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                className="pl-1 underline text-blue-300"
              >
                Unsplash
              </a>
            </>
          }
        >
          <div className="relative p-3">
            <Search className="w-4 h-4 absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className={`bg-gray-700 text-white pl-8 w-full  pr-4 py-1.5  text-sm ${DESIGN_TOKENS.interactive.input}`}
            />
          </div>

          <div className={`grid grid-cols-2 gap-2 mb-2 p-3 overflow-y-auto`}>
            {backgrounds.map((bg, index) => (
              <ImageBackgroundItem
                key={index}
                index={index}
                bg={bg}
                onSelect={onSelect}
                bgSize={"h-17"}
                ref={index === backgrounds.length - 1 ? observerRef : null}
                isSelected={
                  selectedBackground.type === "image" &&
                  selectedBackground.index === index
                }
              />
            ))}
          </div>
          {internalLoading ||
            (loading && (
              <div className="flex justify-center items-center py-4">
                <SyncLoader color="#ffff" size={10} />
              </div>
            ))}
        </BaseModal>
      </div>
    </>
  );
};

export default AllBackgroundsModal;
