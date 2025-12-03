// 診断質問データベース（全業界共通）
const commonQuestions = {
    dx: {
        name: 'DX・IT化',
        questions: [
            '情報共有や連絡業務に時間がかかりすぎていませんか？',
            '顧客情報や予約管理が煩雑になっていませんか？',
            'ITツールを導入しても、社内で使いこなせていない状況はありませんか？'
        ]
    },
    efficiency: {
        name: '業務効率化',
        questions: [
            '同じ作業を何度も繰り返していたり、手作業が多すぎませんか？',
            '特定の人しかできない業務があり、属人化していませんか？',
            '会議や報告書作成など、成果に直結しない業務に時間を取られていませんか？'
        ]
    },
    sales: {
        name: '売上向上',
        questions: [
            '集客が不安定で、紹介や口コミ頼みになっていませんか？',
            'ホームページやSNSで、何を発信すれば良いかわからない状況ですか？',
            'リピーターが増えず、新規顧客の獲得ばかりに追われていませんか？'
        ]
    },
    cost: {
        name: 'コスト削減',
        questions: [
            '何にいくら使っているか、正確に把握できていますか？',
            '昔からの契約や外注をそのまま続けていませんか？',
            'コストを削減したいが、どこから手をつければ良いかわからない状況ですか？'
        ]
    }
};

// 業界データベース（業界名と解決案のみ）
const questionDatabase = {
    education: {
        name: '教育業界',
        categories: {
            dx: {
                name: 'DX・IT化',
                questions: commonQuestions.dx.questions,
                solutions: {
                    low: '情報共有ツール（LINE・Google等）の導入により、連絡業務を劇的に効率化できます。現場で使える形での定着支援も行います。',
                    medium: '既存ツールの活用度を高め、さらに予約・顧客管理システムと連携することで、業務全体のデジタル化を推進できます。',
                    high: '現在のDX環境をさらに最適化し、データ活用による教育サービスの質向上を実現できます。'
                }
            },
            efficiency: {
                name: '業務効率化',
                questions: commonQuestions.efficiency.questions,
                solutions: {
                    low: '業務の棚卸しと自動化により、手作業と重複作業を大幅に削減できます。マニュアル化で属人化も解消します。',
                    medium: '業務フローの見直しにより、さらに効率を高め、コア業務に集中できる環境を整備できます。',
                    high: '業務プロセスの継続的改善により、生産性をさらに向上させることができます。'
                }
            },
            sales: {
                name: '売上向上',
                questions: commonQuestions.sales.questions,
                solutions: {
                    low: 'Web・SNSの改善と集客導線の設計により、安定した新規獲得の仕組みを構築できます。',
                    medium: 'メッセージ設計の最適化とリピート施策により、集客効率と顧客生涯価値を向上できます。',
                    high: 'データ分析に基づく戦略的なマーケティング施策で、さらなる収益拡大が期待できます。'
                }
            },
            cost: {
                name: 'コスト削減',
                questions: commonQuestions.cost.questions,
                solutions: {
                    low: 'コスト構造の可視化と優先順位付けにより、無駄な支出を特定し削減できます。',
                    medium: '契約の見直しと最適化により、さらなるコスト削減が可能です。',
                    high: '削減と投資のバランス最適化により、利益体質への転換を実現できます。'
                }
            }
        }
    },
    medical: {
        name: '医療・福祉業界',
        categories: {
            dx: {
                name: 'DX・IT化',
                questions: commonQuestions.dx.questions,
                solutions: {
                    low: 'クラウド型の情報共有システムと予約管理ツールの導入により、業務効率と患者満足度を向上できます。',
                    medium: 'システム連携の強化により、記録業務の時間を大幅に削減し、ケアの質を高められます。',
                    high: 'データ活用とIoT連携により、さらに高度な医療・ケアサービスを提供できます。'
                }
            },
            efficiency: {
                name: '業務効率化',
                questions: commonQuestions.efficiency.questions,
                solutions: {
                    low: '記録テンプレートと業務フロー改善により、申し送りや報告書作成の時間を削減できます。',
                    medium: 'シフト管理の最適化とマニュアル整備により、スタッフの負担を軽減できます。',
                    high: '業務標準化の推進により、質の高いケアを効率的に提供できる体制を構築できます。'
                }
            },
            sales: {
                name: '売上向上',
                questions: commonQuestions.sales.questions,
                solutions: {
                    low: 'Webサイトの改善と地域連携により、新規患者・利用者の獲得を促進できます。',
                    medium: 'サービスメニューの見直しと積極的な提案で、収益性を向上できます。',
                    high: '地域での存在感を高め、安定した患者・利用者の確保が可能です。'
                }
            },
            cost: {
                name: 'コスト削減',
                questions: commonQuestions.cost.questions,
                solutions: {
                    low: '在庫管理の最適化と固定費の見直しにより、無駄なコストを削減できます。',
                    medium: '光熱費や設備投資の見直しにより、さらなるコスト削減が可能です。',
                    high: 'データに基づく最適配置により、質を保ちながらコスト最適化を実現できます。'
                }
            }
        }
    },
    fashion: {
        name: 'アパレル、美容',
        categories: {
            dx: {
                name: 'DX・IT化',
                questions: commonQuestions.dx.questions,
                solutions: {
                    low: 'LINE公式アカウントと予約システムの導入により、顧客対応を効率化し、リピート率を向上できます。',
                    medium: 'CRMと在庫管理の連携により、顧客満足度と業務効率を同時に高められます。',
                    high: 'オムニチャネル戦略により、オンラインとオフラインの融合を実現できます。'
                }
            },
            efficiency: {
                name: '業務効率化',
                questions: commonQuestions.efficiency.questions,
                solutions: {
                    low: '予約管理とPOSシステムの活用により、電話対応と事務作業を大幅に削減できます。',
                    medium: '在庫管理の自動化により、発注業務と棚卸し作業を効率化できます。',
                    high: 'クラウド型管理システムにより、どこからでも店舗状況を確認・管理できます。'
                }
            },
            sales: {
                name: '売上向上',
                questions: commonQuestions.sales.questions,
                solutions: {
                    low: 'SNS活用とリピート施策により、安定した集客基盤を構築できます。',
                    medium: 'メッセージ設計とアップセル施策により、客単価を向上できます。',
                    high: 'ブランディング戦略により、「売り込まなくても選ばれる」状態を実現できます。'
                }
            },
            cost: {
                name: 'コスト削減',
                questions: commonQuestions.cost.questions,
                solutions: {
                    low: 'データに基づく発注管理により、過剰在庫と廃棄を大幅に削減できます。',
                    medium: '固定費の見直しにより、利益率を改善できます。',
                    high: '需要予測と最適シフトにより、売上とコストのバランスを最適化できます。'
                }
            }
        }
    },
    logistics: {
        name: '運輸・物流',
        categories: {
            dx: {
                name: 'DX・IT化',
                questions: commonQuestions.dx.questions,
                solutions: {
                    low: '配車管理システムと情報共有ツールの導入により、ルート最適化と連絡業務を効率化できます。',
                    medium: 'リアルタイム追跡システムで、顧客満足度とオペレーション効率が向上します。',
                    high: 'AIによる需要予測と自動配車により、さらなる効率化が可能です。'
                }
            },
            efficiency: {
                name: '業務効率化',
                questions: commonQuestions.efficiency.questions,
                solutions: {
                    low: 'ルート最適化と作業手順の標準化により、配送時間と作業時間を短縮できます。',
                    medium: '自動請求システムとバーコード管理で、事務作業を大幅に削減できます。',
                    high: 'RPAとマテハン機器の活用により、人手作業をさらに削減できます。'
                }
            },
            sales: {
                name: '売上向上',
                questions: commonQuestions.sales.questions,
                solutions: {
                    low: 'Webサイトとオンライン見積もりで、新規顧客獲得を効率化できます。',
                    medium: 'オプションサービスの拡充により、収益性を向上できます。',
                    high: '協力会社ネットワークの構築で、事業規模を拡大できます。'
                }
            },
            cost: {
                name: 'コスト削減',
                questions: commonQuestions.cost.questions,
                solutions: {
                    low: '燃費管理と配送計画の見直しにより、燃料費を削減できます。',
                    medium: '混載便の活用と稼働率向上により、車両コストを最適化できます。',
                    high: 'ルート最適化による労働時間削減で、残業代を削減できます。'
                }
            }
        }
    },
    media: {
        name: '広告マスコミ',
        categories: {
            dx: {
                name: 'DX・IT化',
                questions: commonQuestions.dx.questions,
                solutions: {
                    low: 'プロジェクト管理ツールとクラウドストレージで、チーム連携が劇的に改善します。',
                    medium: 'マーケティングオートメーションツールで、デジタル施策を強化できます。',
                    high: 'データ分析プラットフォームにより、効果測定と改善サイクルを確立できます。'
                }
            },
            efficiency: {
                name: '業務効率化',
                questions: commonQuestions.efficiency.questions,
                solutions: {
                    low: 'テンプレート化とワークフロー管理で、制作時間を大幅に短縮できます。',
                    medium: 'AIツールの活用により、資料作成と制作業務を効率化できます。',
                    high: 'クライアントポータルの構築で、円滑なコミュニケーションが実現します。'
                }
            },
            sales: {
                name: '売上向上',
                questions: commonQuestions.sales.questions,
                solutions: {
                    low: 'ポートフォリオサイトとコンテンツマーケティングで、引き合いを増やせます。',
                    medium: '定期的な提案活動により、既存顧客の売上を拡大できます。',
                    high: '実績とケーススタディの蓄積により、大型案件の受注確率が高まります。'
                }
            },
            cost: {
                name: 'コスト削減',
                questions: commonQuestions.cost.questions,
                solutions: {
                    low: 'フリーランスネットワークの構築により、柔軟なコスト管理が可能です。',
                    medium: 'リモートワークとコワーキングスペース活用で、オフィスコストを削減できます。',
                    high: '業務の標準化により、無駄な時間とコストを大幅に削減できます。'
                }
            }
        }
    },
    hr: {
        name: '人材',
        categories: {
            dx: {
                name: 'DX・IT化',
                questions: commonQuestions.dx.questions,
                solutions: {
                    low: '採用管理システム（ATS）の導入により、採用業務を効率化できます。',
                    medium: 'Web面接ツールとオンライン研修で、時間とコストを削減できます。',
                    high: 'AIマッチングと自動化により、採用精度と業務効率が飛躍的に向上します。'
                }
            },
            efficiency: {
                name: '業務効率化',
                questions: commonQuestions.efficiency.questions,
                solutions: {
                    low: 'テンプレート化と自動掲載ツールで、求人業務を大幅に効率化できます。',
                    medium: '日程調整ツールとチャットボットにより、コミュニケーション業務を削減できます。',
                    high: '電子契約とRPA活用で、事務作業をほぼ自動化できます。'
                }
            },
            sales: {
                name: '売上向上',
                questions: commonQuestions.sales.questions,
                solutions: {
                    low: 'デジタルマーケティングとWebセミナーで、新規企業を効率的に開拓できます。',
                    medium: 'コンサルティングサービスの追加により、付加価値を高められます。',
                    high: 'データ分析に基づく戦略提案で、高単価サービスへの転換が可能です。'
                }
            },
            cost: {
                name: 'コスト削減',
                questions: commonQuestions.cost.questions,
                solutions: {
                    low: '媒体効果の分析により、費用対効果の高い求人チャネルに集中できます。',
                    medium: 'リモートワーク推進とペーパーレス化で、固定費を削減できます。',
                    high: 'AIツールとアウトソーシングの活用で、人件費を最適化できます。'
                }
            }
        }
    }
};

// カテゴリー名の定義
const categoryNames = {
    dx: 'DX・IT化',
    efficiency: '業務効率化',
    sales: '売上向上',
    cost: 'コスト削減'
};

// カテゴリーの順序
const categoryOrder = ['dx', 'efficiency', 'sales', 'cost'];

// 私ができることデータ
const myServices = {
    dx: {
        title: 'DX・IT化支援（デジタル活用・仕組みづくり）',
        problems: [
            'ITツールを入れているが使いこなせていない',
            'アナログ業務が多く、情報が属人化している',
            '社内にITに詳しい人がいない'
        ],
        solutions: [
            '現在の業務フローを整理し、どこをデジタル化すべきか可視化',
            '無理のないツール選定（LINE・Google・予約・顧客管理 等）',
            '社員が使えるようになるまでの導入サポート・定着支援',
            '「入れただけ」で終わらせない運用ルール作り・改善提案'
        ],
        message: '「ツール導入」ではなく、「使って成果が出る状態」まで伴走します。'
    },
    efficiency: {
        title: '業務効率化（ムダ削減・属人化の解消）',
        problems: [
            '同じ作業を何度もやり直している',
            'ベテラン社員しか分からない仕事が多い',
            '忙しいのに成果が出にくい'
        ],
        solutions: [
            '現場ヒアリングによる業務の棚卸し・ムダの見える化',
            '手作業・二重入力の自動化・簡略化の提案',
            '誰でも回せる業務マニュアル化・仕組み化',
            '「人に依存しない業務体制」への再設計'
        ],
        message: '残業削減・引き継ぎ不安の解消・生産性向上につながります。'
    },
    sales: {
        title: '売上向上（集客・成約率・リピート改善）',
        problems: [
            '集客が不安定',
            '紹介や口コミに頼っている',
            'WebやSNSを活用できていない'
        ],
        solutions: [
            'ホームページ・SNS・広告の現状分析と改善提案',
            '「誰に・何を・どう伝えるか」を整理した集客導線の設計',
            '反応が出るメッセージ設計・導線改善',
            '来ただけで終わらせないリピート・再来設計'
        ],
        message: '売上アップだけでなく、「売り込まなくても選ばれる状態」を目指します。'
    },
    cost: {
        title: 'コスト削減（固定費・ムダな支出の最適化）',
        problems: [
            '何にいくら使っているか把握できていない',
            '昔からの契約をそのまま続けている',
            '外注・広告費が適正かわからない'
        ],
        solutions: [
            '固定費・変動費の構造整理とムダの洗い出し',
            '通信費・システム費・外注費の見直し提案',
            '「削る」だけでなく利益が残るコスト設計',
            '削減と売上施策を同時に設計'
        ],
        message: '単なる節約ではなく、「利益体質への転換」を行います。'
    }
};
