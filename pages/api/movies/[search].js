export default async function handler(req, res) {
  try {
    const {
      query: { search },
    } = req;

    const data = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${search}`
    );

    const movies = await data.json();

    res.status(200).json({
      movies: movies,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
