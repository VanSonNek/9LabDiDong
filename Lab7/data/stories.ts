export interface StoryChoice {
  text: string;
  nextId: number;
}

export interface StoryNode {
  id: number;
  title: string;
  text: string;
  choice1?: StoryChoice;
  choice2?: StoryChoice;
  isEnding?: boolean;
  endingTitle?: string;
  endingEmoji?: string;
}

export const STORIES: Record<number, StoryNode> = {
  1: {
    id: 1,
    title: 'Ngã Rẽ Rừng Sương',
    text: 'Xe của bạn bị nổ lốp trên con đường rừng hoang vắng lúc trời chập tối. Xa xa có ánh đèn le lói phát ra từ một ngôi nhà gỗ cổ kính, bên cạnh là một con đường mòn uốn lượn dẫn vào thung lũng sương mù.',
    choice1: {
      text: 'Tiến về phía ngôi nhà gỗ có ánh đèn',
      nextId: 2,
    },
    choice2: {
      text: 'Đi theo con đường mòn vào thung lũng',
      nextId: 3,
    },
  },
  2: {
    id: 2,
    title: 'Ngôi Nhà Cổ Tích',
    text: 'Bạn gõ cửa ngôi nhà gỗ. Một cụ già râu tóc bạc phơ bước ra, ánh mắt hiền từ. Cụ trao cho bạn một chiếc chìa khóa vàng cổ xưa và chỉ tay về phía chiếc rương phủ rêu dưới sàn nhà.',
    choice1: {
      text: 'Dùng chìa khóa tra vào ổ khóa rương',
      nextId: 4,
    },
    choice2: {
      text: 'Từ chối chìa khóa và xin nghỉ ngơi bên lò sưởi',
      nextId: 5,
    },
  },
  3: {
    id: 3,
    title: 'Hẻm Núi Sương Mù',
    text: 'Con đường mòn dẫn bạn tới một hẻm núi hùng vĩ. Một cây cầu dây văng cheo leo bắc qua vực thẳm mây mù, trong khi phía dưới có một chiếc bè gỗ trôi nhẹ trên dòng sông ngầm êm ả.',
    choice1: {
      text: 'Dũng cảm bước qua cây cầu dây văng',
      nextId: 6,
    },
    choice2: {
      text: 'Trèo xuống bè gỗ thả trôi theo dòng sông',
      nextId: 7,
    },
  },
  4: {
    id: 4,
    title: 'Chiếc Rương Ma Thuật',
    text: 'Ổ khóa bật mở! Một vầng hào quang xanh ngọc bích tỏa sáng khắp gian phòng. Bên trong là cuốn sách cổ chứa bí thuật vạn vật cùng ngọc ấn của vị thần rừng thiêng. Bạn chính thức trở thành người bảo hộ thế hệ mới!',
    isEnding: true,
    endingTitle: 'KẾT THÚC: NGƯỜI BẢO HỘ RỪNG THIÊNG',
    endingEmoji: '👑',
  },
  5: {
    id: 5,
    title: 'Đêm Lửa Ấm Áp',
    text: 'Bên đốm lửa bập bùng, cụ già pha cho bạn tách trà thảo mộc thơm lừng và chỉ dẫn bạn lối thoát ra khỏi rừng. Sáng hôm sau, chiếc xe của bạn đã được thay lốp mới tinh một cách kỳ diệu.',
    isEnding: true,
    endingTitle: 'KẾT THÚC: HÀNH TRÌNH BÌNH YÊN',
    endingEmoji: '🏡',
  },
  6: {
    id: 6,
    title: 'Lâu Đài Ánh Sao',
    text: 'Vừa đặt chân qua bờ bên kia cây cầu, màn sương tan biến để lộ một tòa lâu đài pha lê tráng lệ dưới bầu trời ngàn sao. Một đoàn kỵ sĩ hoàng gia cúi đầu chào đón vị khách định mệnh.',
    isEnding: true,
    endingTitle: 'KẾT THÚC: VỊ KHÁCH ĐỊNH MỆNH',
    endingEmoji: '🏰',
  },
  7: {
    id: 7,
    title: 'Dòng Sông Phát Sáng',
    text: 'Dòng sông ngầm phát quang đưa bạn trôi vào một hang động thạch nhũ lung linh kỳ ảo. Lối ra của dòng sông dẫn thẳng về trạm kiểm lâm trên quốc lộ, mang theo những kỷ niệm phiêu lưu không thể nào quên.',
    isEnding: true,
    endingTitle: 'KẾT THÚC: CHUYẾN PHIÊU LƯU KỲ THÚ',
    endingEmoji: '🛶',
  },
};
