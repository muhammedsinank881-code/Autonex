
const getShareLinks = ({ url, title, image }) => {
  const productUrl = encodeURIComponent(url);
  const description = encodeURIComponent(title);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`,

    twitter: `https://twitter.com/intent/tweet?url=${productUrl}&text=${description}`,

    pinterest: `https://pinterest.com/pin/create/button/?url=${productUrl}&media=${encodeURIComponent(image || "")}&description=${description}`,

    whatsapp: `https://api.whatsapp.com/send?text=${description}%20${productUrl}`,
  };
};

export const shareProduct = (platform, product) => {
  const links = getShareLinks({
    url: product.url || window.location.href,
    title: product.title,
    image: product.image,
  });

  const shareUrl = links[platform];

  if (!shareUrl) return;

  window.open(
    shareUrl,
    "_blank",
    "noopener,noreferrer"
  );
};
