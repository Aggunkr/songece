const User = require("../models/User");

// Mevcut fonksiyonlar (favori vs.) varsa buraya ekleyin...

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.status(200).json(user);
  } catch (error) {
    console.error("GetUserProfile Error:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { username, email, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, address },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ msg: "Kullanıcı bulunamadı" });
    }
    res.status(200).json({ msg: "Profil güncellendi", user: updatedUser });
  } catch (error) {
    console.error("Profil güncelleme hatası:", error);
    res.status(500).json({ msg: "Sunucu hatası" });
  }
};

module.exports = {
  // Diğer fonksiyonlar varsa (addToFavorites, getFavorites vs.) burada yer alabilir.
  getUserProfile,
  updateUserProfile
};
