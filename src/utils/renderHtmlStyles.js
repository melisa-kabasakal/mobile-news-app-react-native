export const getRenderHtmlStyles = (isDarkMode) => ({
  h1: {
    fontSize: 22,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 16,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 12,
  },
  h3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
    marginBottom: 10,
  },
  p: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: isDarkMode ? '#ccc' : '#333',
  },
  img: {
  width: '100%',
  height: 'auto',
  marginVertical: 15,
  borderRadius: 8,
},
  strong: {
    fontWeight: 'bold',
    color: isDarkMode ? '#fff' : '#000',
  },
});
