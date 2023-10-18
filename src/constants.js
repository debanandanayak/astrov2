const Role = {
  ADMIN: "admin",
  USER: "user",
  ASTROLOGER: "astrologer",
}

const datePattern = /^(\d{2})\-(\d{2})\-(\d{4})(?: (\d{2})(?::(\d{2}))?(?::(\d{2}))? (AM|PM|am|pm))?$/

module.exports = {Role,datePattern}
