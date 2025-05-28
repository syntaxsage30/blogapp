import styles from '../styles/Features.module.css';

export default function ShareButton({ post }) {
  const shareData = {
    title: post.title,
    text: post.summary,
    url: typeof window !== 'undefined' ? window.location.href : ''
  };

  const handleShare = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Sharing cancelled');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareData.url);
    alert('Link copied to clipboard!');
  };

  return (
    <>
      <button
        onClick={handleShare}
        className={`${styles.interactionButton} ${styles.shareButton}`}
      >
        📤 Share
      </button>
      <button
        onClick={copyLink}
        className={`${styles.interactionButton} ${styles.copyButton}`}
      >
        🔗 Copy
      </button>
    </>
  );
}